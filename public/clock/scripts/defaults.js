const defaultScript = `let val = 0;
function trimRing (){
val++
if(val>20){
    return;
}
ring.play()
setTimeout(()=>{
    ring.reset();
    trimRing()
},500)
}
trimRing()`