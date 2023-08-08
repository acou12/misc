let factorial=(x)=>{return ((x && (x * (factorial)((x - 1)))) || 1);};let main=()=>{return (print)((factorial)(15));};

let print = console.log;

main();