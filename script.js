// Retrieve data from local storage or initialize empty array
let members = JSON.parse(localStorage.getItem('members')) || [];

// Function to render member list
function renderMembers() {
    const memberList = document.getElementById('memberList');
    memberList.innerHTML = '';
    members.forEach((member, index) => {
        const li = document.createElement('li');
        li.textContent = `${member.name} (${member.votes} votes)`;
        li.classList.add('border', 'border-gray-300', 'p-2', 'rounded', 'my-2', 'flex', 'justify-between', 'items-center');
        li.addEventListener('click', () => {
            increaseVote(index);
        });

        // Check if this member has the highest vote
        if (index === getHighestVotedMemberIndex()) {
            const badge = document.createElement('span');
            badge.textContent = '1st';
            badge.classList.add('bg-green-500', 'text-white', 'px-2', 'py-1', 'rounded', 'text-sm');
            li.appendChild(badge);
        }

        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('bg-red-500', 'text-white', 'px-2', 'py-1', 'rounded', 'text-sm', 'ml-2');
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent the click event from propagating to the li
            deleteMember(index);
        });
        li.appendChild(deleteButton);

        memberList.appendChild(li);
    });
}

// Function to add a new member
function addMember() {
    const memberNameInput = document.getElementById('memberName');
    const name = memberNameInput.value.trim();
    if (name === '') return;
    if (members.some(member => member.name === name)) {
        alert("Can't add the same member twice.");
        return;
    }
    members.push({ name, votes: 0 });
    memberNameInput.value = '';
    renderMembers();
    saveData();
}

// Function to increase vote count
function increaseVote(index) {
    members[index].votes++;
    renderMembers();
    saveData();
}

// Function to delete a member
function deleteMember(index) {
    members.splice(index, 1);
    renderMembers();
    saveData();
}

// Function to get the index of the member with the highest vote
function getHighestVotedMemberIndex() {
    let highestIndex = 0;
    let highestVotes = 0;
    members.forEach((member, index) => {
        if (member.votes > highestVotes) {
            highestVotes = member.votes;
            highestIndex = index;
        }
    });
    return highestIndex;
}

// Function to save data to local storage
function saveData() {
    localStorage.setItem('members', JSON.stringify(members));
}

// Initial render
renderMembers();
