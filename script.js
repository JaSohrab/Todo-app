const input=document.querySelector("#taskInput");
const addBtn=document.querySelector("#addBtn");
const list=document.querySelector("#taskList"); 
const emptyImage=document.querySelector("#emptyImage");
emptyImage.src="https://picsum.photos/300/200";

let tasks=JSON.parse(localStorage.getItem("tasks"))||[];
function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
} 
const toggle=document.querySelector(".fa-solid");
const bdy=document.querySelector(".fortoggle-btn");
toggle.addEventListener("click",()=>{
    bdy.classList.toggle("dark")
})
function render(){
    list.innerHTML="";
    if(tasks.length===0){
        emptyImage.style.display="block";
       }else{
        emptyImage.style.display="none"
       }
    if(emptyImage){
        emptyImage.classList.toggle("hidden",tasks.length>0)
    }
    tasks.forEach((task,index) => {
        const li=document.createElement("li");
        li.classList.add("task-item");
        const text=document.createElement("span");
        text.innerText=task.text;
        if(task.done){
            text.classList.add("done");
    }   
        text.addEventListener("click",()=>{
            tasks[index].done=!tasks[index].done;
            saveTasks();
            render();
    });
       const del=document.createElement("button");
       del.innerHTML="x";
       del.classList.add("delete-btn");
       del.addEventListener("click",()=>{
        tasks.splice(index,1);
        saveTasks();
        render();
   });
    li.appendChild(text);
    li.appendChild(del);
    list.appendChild(li); 
    });
}
addBtn.addEventListener("click",()=>{
    const value=input.value.trim();
    if(!value)return ;
    tasks.push({text:value,done:false,date:Date.now()});
    input.value="";
    saveTasks();
    render();
    });
    input.addEventListener("keypress",(e)=>{
        if(e.key==="Enter"){
            addBtn.click();
        }
});
render();
