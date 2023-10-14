// ui-btns.js
// Event listners for button behaviors

window.onload = function() {
  document.querySelector("input[name='task']").focus();
};

// document.getElementById("addNewTask").addEventListener("click", async function() {
//   const taskValue = document.getElementById("newTask").value;
//   try {
//     const response = await axios.post('/create-task', { task: taskValue });
//     window.location.reload();

//   } catch (error) {
//     console.error("Error adding new item:", error);
//   }
// });

document.getElementById('newTask').addEventListener('keydown', async function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevents the default action
    const taskValue = document.getElementById("newTask").value;
    
    if (taskValue) {
      await axios.post('/create-task', { task: taskValue });
      window.location.reload();
    }
  }
});

document.getElementById('newTask').addEventListener('focusout', async function(event) {
    event.preventDefault(); // Prevents the default action
    const taskValue = document.getElementById("newTask").value;
    
    if (taskValue) {
      await axios.post('/create-task', { task: taskValue });
      window.location.reload();
  }
});

document.addEventListener('click', async function(event) {
  if (event.target.classList.contains('delete-me')) {
    const taskId = event.target.parentElement.parentElement.id;
    await fetch(`/delete-task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: taskId })
    });
    event.target.parentElement.parentElement.remove();
  }
});

document.addEventListener('focusout', async function(event) {
  if (event.target.classList.contains('item-text')) {
    const newTask = event.target.innerText;
    const oldTask = event.target.getAttribute('data-old-task');
    const taskId = event.target.parentElement.id;
    if (newTask !== oldTask) {
      await fetch(`/edit-task`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: taskId, newTask })
      });
      event.target.setAttribute('data-old-task', newTask);
    }
  }
});
