Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
// Remember to inform BOTH the Back4App Application ID AND the JavaScript KEY
Parse.initialize(
  'MHAwuJCbDeP32XtOY4P93j46Ur7h3mW1z7oWXQLs', // This is your Application ID
  '9APsfaduTylH52Ws7r1txXnNwkkhH8WomtxsltAT' // This is your Javascript key
);

let pessoas = [];
const lista = document.getElementById("lista");


function gerarLista() {
  lista.innerHTML = "";
  for (let i = 0; i < pessoas.length; ++i) {
    const li = document.createElement("li");
    const txt = document.createTextNode(
      ` ${pessoas[i].descricao} `);
    const btnDelete = document.createElement("input");
    btnDelete.type = "submit";
    btnDelete.value = "Remover";
    btnDelete.onclick =()=> remover(pessoas[i]);
    const btnCheck=document.createElement("input");  
    btnCheck.type="checkbox";
    btnCheck.onclick =()=> checkbox(pessoas[i]);
    const checado = pessoas[i].concluida;
    console.log(checado)
    if(checado == true) {
      btnCheck.checked = true;
    } 
    else{
      btnCheck.checked = false;
    }
    
    li.appendChild(txt);
    li.appendChild(btnCheck);
    li.appendChild(btnDelete);
    lista.appendChild(li); 
    
  }
  
}

const fetchPessoas = async () => {
  const Tarefa = Parse.Object.extend("Tarefa");
  const query = new Parse.Query(Tarefa);
  try {
    const results = await query.find();
    pessoas = [];
    for (const object of results) {
      const id = object.id
      const descricao = object.get("descricao");
      const concluida = object.get("concluida");
      pessoas.push({ descricao, concluida });
      console.log(pessoas);
    } 
    gerarLista();
    // inserir();
  } catch (error) {
    console.error("Error while fetching Pessoa", error);
  }
};

const fetchPessoas2 = () => {
  const Tarefa = Parse.Object.extend("Tarefa");
  const query = new Parse.Query(Tarefa);
  query
    .find()
    .then((results) => {
      pessoas = [];
      for (const object of results) {
        const descricao = object.get("descricao");
        const concluida = object.get("concluida");
        pessoas.push({ descricao, concluida });
      }
      gerarLista();
      // inserir();
    })
    .catch((error) => {
      console.error("Error while fetching Pessoa", error);
    });
};

function checkbox(id) {
  const query = new Parse.Query(ListaTarefas);
  try {
      const object = query.get(id);
      object.set('concluida', true);
      try {
          if(concluida == false){
              const response = object.save();
              location.reload();
              console.log('Deleted ParseObject', response);
          }
      } catch (error) {
          console.error('Error while updating ListaTarefas', error);
      }
  } catch (error) {
      console.error('Error while retrieving object ListaTarefas', error);
  }
}


function inserir() {
  const nome = document.getElementById('nome').value;
  console.log(nome);
    const novo = new Parse.Object('Tarefa');
    novo.set('descricao', nome);
    novo.set('concluida', false);
    try {
      const result = novo.save();
      location.reload();
      console.log('Tarefa created', result);
    } catch (error) {
      alert('Preencha o campo de Descrição!');
      console.error('Error while creating Tarefa: ', error);
    }
  };

  function remover(id) {
      const query = new Parse.Query('Tarefa');
      try {
        const object = query.get(id);
        try {
          const response = object.destroy();
          alert('Item deletado com sucesso!')
          location.reload();
          console.log('Deleted ParseObject', response);
        } catch (error) {
          console.error('Error while deleting ParseObject', error);
        }
      } catch (error) {
        console.error('Error while retrieving ParseObject', error);
      }
  }

  fetchPessoas();