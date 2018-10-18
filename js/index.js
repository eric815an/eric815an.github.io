console.clear();

let config = {
	apiKey: "AIzaSyCzBZ78VCgB8aMM6qsEMG6LXxYFC_pOVzo",
	authDomain: "verse-a1e96.firebaseapp.com",
	databaseURL: "https://verse-a1e96.firebaseio.com",
	projectId: "verse-a1e96",
	storageBucket: "verse-a1e96.appspot.com",
	messagingSenderId: "490796473738"
};
firebase.initializeApp(config);

const txt = document.getElementById("txt");
const send = document.getElementById("btn");
const list = document.getElementById("list");
const todos = firebase.database().ref("todos");

send.addEventListener("click", () => {
	todos.push({
		content: txt.value
	});
	txt.value = "";
});


todos.on("value", snapshot => {
	let str = "";
	let data = [];
	snapshot.forEach(item => {
		data.push({ key: item.key, content: item.val().content });
	});

	data.reverse();

	for (let i = 0; i < data.length; i++) {
		str += `<li data-key="${data[i].key}">${data[i].content}</li>`;
	}
	list.innerHTML = str;
});


list.addEventListener("click", evt => {
	if (evt.target.nodeName === "LI") {
		let key = evt.target.dataset.key;
		todos.child(key).remove();
	}
});
