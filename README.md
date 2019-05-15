# automatic-dam-management-system

## TODO
- [x] http requests  
- [x] firebase queue  
- [x] web page design  
- [ ] implement route  
 
## page required elements
- home : 현재 상태 간략하게 표시
- stat : 데이터 -> 그래프 (D3.js), 방수 여부, 강수량 + 현재 상태에 따라 command

## node-python detail
- 데이터가 들어올 때마다 py에 argv로 인자값을 전달
- py에서는 전달받은 인자값으로 학습데이터에 누적, 연산하여 결과 데이터를 .dat 확장자로 저장
