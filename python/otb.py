a=25
b=1
while a!=0:
    val_1=a%10
    rem=val_1//2
    rem+=rem*b
    b*=10
    
    a=a//10
print(rem)