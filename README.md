Criar uma instancia no mongoDB chamado UOL.


Cadastrar cidade
  - End-point: localhost:3000/localidade
  - Exemplo:
      {
	        "cidade":"camaragibe",
	        "estado":"pernambuco"
      }

Consultar cidade pelo nome
  - End-point: localhost:3000/localidade/{nome da cidade}

Consultar cidade pelo estado
  - End-point: localhost:3000/localidade/estado/{nome do estado}

Cadastrar cliente
  - End-point: localhost:3000/cliente
  - Exemplo:
        {
          "nome":"joão silva",
          "sexo":"M",
          "data_nascimento":"10/10/2000",
          "idade":31,
          "nome_cidade":"pomerode"
        }

Consultar cliente pelo nome
  - End-point: localhost:3000/cliente/nome/{nome do cliente}

Consultar cliente pelo Id
  - End-point: localhost:3000/cliente/id/{_id do cliente}

Remover cliente
  - End-point: localhost:3000/cliente/{_id do cliente}

Alterar o nome do cliente
  - End-point: localhost:3000/cliente/editar/{_id do cliente}
  - Exemplo:
            {
	              "nome_cliente":"MARIA JOÃO"
            }
  
  
  
  
  
  
  
