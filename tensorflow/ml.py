import tensorflow as tf
import numpy as np
import matplotlib
import os

#tf.set_random_seed(777)  # reproducibility
if "DISPLAY" not in os.environ:
    # remove Travis CI Error
    matplotlib.use('TkAgg')

import matplotlib.pyplot as plt

def MinMaxScaler(data):
    numerator = data - np.min(data, 0)
    denominator = np.max(data, 0) - np.min(data, 0)
    # noise term prevents the zero division
    return numerator / (denominator + 1e-7)

def MinScale(data):
    return np.min(data, 0)



def MaxScale(data):
    return np.max(data, 0)

# train Parameters
seq_length = 7
data_dim = 5
hidden_dim = 10
output_dim = 1
learning_rate = 0.01
iterations = 500

# Open, High, Low, Volume, Close
#시계열 데이터를 받아온다.
#xy = np.loadtxt("data\\data-02-stock_daily.csv", delimiter=',')
xy = np.loadtxt("./tensorflow/easy.csv", delimiter=',')
#시간에 대한 데이터라서 거꾸로 배열을 받아온다.
xy = xy[::-1]  # reverse order (chronically ordered)
print(xy[2][0])
# train/test split
train_size = int(len(xy) * 0.7)
train_set = xy[0:train_size]
test_set = xy[train_size - seq_length:]  # Index from [train_size - seq_length] to utilize past sequence
#test_set = xy[:]


# Scale each
train_set = MinMaxScaler(train_set)
array_min = MinScale(test_set)
array_max = MaxScale(test_set)
undo = array_max[4]-array_min[4]
minimum = array_min[4]
test_set = MinMaxScaler(test_set)

# build datasets
def build_dataset(time_series, seq_length):
    dataX = []
    dataY = []
    for i in range(0, len(time_series) - seq_length):
        _x = time_series[i:i + seq_length, :]
        _y = time_series[i + seq_length, [-1]]  # Next close price
       # print(_x, "->", _y)
        dataX.append(_x)
        dataY.append(_y)
    return np.array(dataX), np.array(dataY)

trainX, trainY = build_dataset(train_set, seq_length)
testX, testY = build_dataset(test_set, seq_length)

# input place holders
X = tf.placeholder(tf.float32, [None, seq_length, data_dim])
Y = tf.placeholder(tf.float32, [None, 1])

# build a LSTM network
cell = tf.contrib.rnn.BasicLSTMCell(
    num_units=hidden_dim, state_is_tuple=True, activation=tf.tanh)
outputs, _states = tf.nn.dynamic_rnn(cell, X, dtype=tf.float32)
Y_pred = tf.contrib.layers.fully_connected(
    outputs[:, -2], output_dim, activation_fn=None)  # We use the last cell's output

# cost/loss
loss = tf.reduce_sum(tf.square(Y_pred - Y))  # sum of the squares
# optimizer
optimizer = tf.train.AdamOptimizer(learning_rate)
train = optimizer.minimize(loss)

# RMSE
targets = tf.placeholder(tf.float32, [None, 1])
predictions = tf.placeholder(tf.float32, [None, 1])
rmse = tf.sqrt(tf.reduce_mean(tf.square(targets - predictions)))

while(1):
    with tf.Session() as sess:
        init = tf.global_variables_initializer()
        sess.run(init)

        # Training step
        for i in range(iterations):
            _, step_loss = sess.run([train, loss], feed_dict={
                X: trainX, Y: trainY})
            print("[step: {}] loss: {}".format(i, step_loss))

        # Test step
        test_predict = sess.run(Y_pred, feed_dict={X: testX})
        rmse_val = sess.run(rmse, feed_dict={
            targets: testY, predictions: test_predict})
        print("RMSE: {}".format(rmse_val))

        # Plot predictions
        # plt.plot(testY * (undo + 1e-7) + minimum)
        # plt.plot(test_predict * (undo + 1e-7) + minimum)
        # plt.xlabel("Time Period")
        #    plt.ylabel("Stock Price")
        # plt.ylabel("Water Level")
        np.savetxt("./tensorflow/result.csv", test_predict * (undo + 1e-7) + minimum, delimiter=",")
        print("delay")
        import time
        time.sleep(3)
    # plt.show();