import tensorflow as tf
import numpy as np
import matplotlib
import os
import json
tf.set_random_seed(777)  # reproducibility
if "DISPLAY" not in os.environ:
    # remove Travis CI Error
    matplotlib.use('TkAgg')

import matplotlib.pyplot as plt
import math


# train Parameters
seq_length = 12
data_dim = 2
hidden_dim = 80
output_dim = 1
learning_rate = 0.01
iterations = 150

# build datasets
def build_dataset(time_series, seq_length):
    dataX = []
    dataY = []
    for i in range(0, len(time_series) - seq_length):
        _x = time_series[i:i + seq_length, :] #sequence의 길이에 해당하는 만큼의 데이터를 받아옴.
        _y = time_series[i + seq_length, [-1]]  # Next close price
       # print(_x, "->", _y)
        dataX.append(_x)
        dataY.append(_y)
    return np.array(dataX), np.array(dataY)

# input place holders
X = tf.placeholder(tf.float32, [None, seq_length, data_dim])
Y = tf.placeholder(tf.float32, [None, 1])
# build a LSTM network
cell = tf.contrib.rnn.BasicLSTMCell(
    num_units=hidden_dim, state_is_tuple=True, activation=tf.tanh)
outputs, _states = tf.nn.dynamic_rnn(cell, X, dtype=tf.float32)
Y_pred = tf.contrib.layers.fully_connected(
    outputs[:, -1], output_dim, activation_fn=None)  # We use the last cell's output

# cost/loss
loss = tf.reduce_sum(tf.square(Y_pred - Y))  # sum of the squares
# optimizer
optimizer = tf.train.AdamOptimizer(learning_rate)
train = optimizer.minimize(loss)







# RMSE
targets = tf.placeholder(tf.float32, [None, 1])
predictions = tf.placeholder(tf.float32, [None, 1])
rmse = tf.sqrt(tf.reduce_mean(tf.square(targets - predictions)))

init = tf.global_variables_initializer()
cnt = 0;

while 1:
    '''
    with open('example.json') as json_file:
        json_data = json.load(json_file)
    '''

    xy = np.loadtxt("data.csv", delimiter=',')
    '''
     xy = np.zeros((5000, 2))
    for step in range(0, 5000):
        t = math.radians(step)
        x = 100 * math.sin(2 * t) + 50 * math.sin(3 * t) + 25 * math.sin(9 * t);  # 탁도
        y = 100 * math.cos(2 * t);  # 수위
 #       z = 100 * math.sin(2 * (t + math.radians(10))) + 50 * math.sin(3 * (t + math.radians(10))) + 25 * math.sin(
  #          9 * (t + math.radians(10)))
      # 10분(각도) 후의 (미래) 탁도
        xy[step][0] = x
        xy[step][1] = y
#        xy[step][2] = z
    #np.savetxt("data.csv",xy, delimiter=",")
    '''

    xy = xy[::-1]  # reverse order (chronically ordered)
    train_size = int(len(xy) * 0.7)
    train_set = xy[0:train_size]
#    test_set = xy[train_size - seq_length:]  # Index from [train_size - seq_length] to utilize past sequence
    test_set = xy
    trainX, trainY = build_dataset(train_set, seq_length)
    testX, testY = build_dataset(test_set, seq_length)

    with tf.Session() as sess:
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
        test_predict = test_predict[::-1]
    np.savetxt("result.csv", test_predict ,delimiter=",")
    print("len of test_predict")
    print(len(test_predict))
    print("delay")
    import time
    time.sleep(10)
    # Plot predictions
    plt.plot(testY)
    plt.plot(test_predict)
    plt.xlabel("Time Period")
    plt.ylabel("Water level")
    plt.show()
