num=122345
val=0
result=0
mul=1
for i in range(0,6):
    # print("1")
  val=num%2
  result=val*mul+result
  num=num//2
  mul=mul*10
  

print(result)  

