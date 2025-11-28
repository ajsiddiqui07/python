# num=int(101101)
num=int(input("enter any binary number:"))
a=0
result=0
while num!=0:
    mul=num%10

    result+=mul*(2**a)
    a+=1
    num=num//10
decimal=0
val=1
l=['1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']
while result!=0:
    rem=result%16
    result=str()
    val=result//16
    

