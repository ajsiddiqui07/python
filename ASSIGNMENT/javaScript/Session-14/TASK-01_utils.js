export function generateOrderId(){
    let  chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = "";

    for(let i=0;i<8;i++){
        id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
}