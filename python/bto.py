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

while result!=0:
    rem=result%8
    result=result//8
    decimal+=rem*val
    val*=10
print(decimal)