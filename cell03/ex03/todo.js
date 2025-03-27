// ฟังก์ชันในการโหลดข้อมูลจากคุกกี้
function loadTodos() {
    let todos = document.cookie.split('; ').find(row => row.startsWith('todos='));
    if (todos) {
        todos = decodeURIComponent(todos.split('=')[1]);
        const todoArray = JSON.parse(todos);
        todoArray.forEach(todo => addTodo(todo));
    }
}

// ฟังก์ชันในการเพิ่ม TO DO ลงในรายการ
function addTodo(todo) {
    const ftList = document.getElementById("ft_list");
    const newDiv = document.createElement("div");
    newDiv.textContent = todo;
    newDiv.onclick = () => removeTodo(newDiv);
    ftList.insertBefore(newDiv, ftList.firstChild);  // ใส่ที่ด้านบนสุดของรายการ
}

// ฟังก์ชันในการลบ TO DO
function removeTodo(todoDiv) {
    if (confirm("Do you want to remove this TO DO?")) {
        todoDiv.remove();
        saveTodos();
    }
}

// ฟังก์ชันในการบันทึก TO DO ลงในคุกกี้
function saveTodos() {
    const todos = [];
    const ftList = document.getElementById("ft_list");
    const todoDivs = ftList.getElementsByTagName("div");
    for (let div of todoDivs) {
        todos.push(div.textContent);
    }
    document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos)) + "; path=/";
}

// ฟังก์ชันในการสร้าง TO DO ใหม่
function newTodo() {
    const todoText = prompt("Enter a new TO DO:");
    if (todoText && todoText.trim() !== "") {
        addTodo(todoText);
        saveTodos();
    }
}

// โหลดข้อมูล TO DO เมื่อหน้าโหลด
window.onload = loadTodos;
