num=121
result=0
while num!=0:
    val=num%10
    num=num//10
    result=result*10+val
if result==num:
    print(result,"num is armstrong")
else:
    print(result,"num is not armstrong")

