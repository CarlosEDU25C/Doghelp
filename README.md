DOG HELP 


ANALISE DE REQUISITOS 

UNIAFA – CENTRO UNIVERSITARIO ALVES FARIA

ENGENHARIA DE SOFTWARE


Aluno Carlos Eduardo De Castro Oliveira












Ano 2026





INTRODUÇAO
Proposta
Com o aumento da popularidade dos animais de estimação e a crescente digitalização dos registros de pets, torna-se cada vez mais importante centralizar e disponibilizar informações relevantes sobre esses animais de forma rápida, segura e acessível. Além disso, iniciativas recentes de identificação animal, popularmente conhecidas como "CPF para cães e gatos", reforçam a necessidade de soluções tecnológicas capazes de organizar e gerenciar dados dos pets.
Atualmente, muitas informações importantes, como histórico de vacinação, consultas veterinárias, dados de identificação, medicamentos, alergias e contatos de emergência, encontram-se dispersas em diferentes documentos ou sistemas, dificultando o acesso por parte dos tutores e estabelecimentos especializados.
Diante desse cenário, surge o DogHelp, uma plataforma desenvolvida para reunir e compartilhar informações essenciais dos animais de estimação em um único ambiente digital. O sistema tem como objetivo proporcionar maior agilidade no atendimento, aumentar a segurança dos dados, facilitar o acompanhamento da saúde dos pets e oferecer mais praticidade tanto para os tutores quanto para pet shops, clínicas veterinárias e demais profissionais do setor.



REQUISITOS FUNCIONAIS (RF)
RF-01 – Cadastro de Usuário
Descrição: O sistema deverá permitir o cadastro de novos usuários.
Dados:
•	Nome completo
•	E-mail
•	Senha
•	Telefone
•	Endereço
RF-02 – Autenticação de Usuário
Descrição: O sistema deverá permitir que usuários realizem login utilizando e-mail e senha.
RF-03 – Cadastro de Animal de Estimação
Descrição: O sistema deverá permitir o cadastro de um ou mais animais vinculados ao usuário.
Dados:
•	Nome do animal
•	Espécie
•	Raça
•	Sexo
•	Idade
•	Peso
•	Foto do animal
RF-04 – Gerenciamento de Informações de Saúde
Descrição: O sistema deverá permitir o registro e atualização das informações de saúde do animal.
Dados:
•	Vacinas
•	Doenças conhecidas
•	Alergias
•	Medicamentos em uso
•	Último check-up veterinário
RF-05 – Controle de Banhos e Serviços
Descrição: O sistema deverá permitir o registro dos banhos e serviços realizados pelo pet shop.
Dados:
•	Data do banho
•	Próximo banho agendado
•	Observações
RF-06 – Consulta de Informações do Animal
Descrição: O sistema deverá permitir que usuários e pet shops autorizados consultem os dados do animal.
RF-07 – Atualização de Dados
Descrição: O sistema deverá permitir a edição das informações do usuário e dos animais cadastrados.
RF-08 – Histórico do Animal
Descrição: O sistema deverá manter um histórico de atendimentos, vacinas, banhos e consultas realizadas.


REQUISITOS NÃO FUNCIONAIS (RNF)
RNF-01 – Relacionamento de múltiplos animais por usuário
O sistema deverá permitir que um único usuário cadastre e gerencie múltiplos animais de estimação vinculados à sua conta.
RNF-02 – Conformidade com informações de saúde animal
O sistema deverá permitir o registro de informações de saúde (vacinas, medicamentos e histórico clínico) seguindo padrões utilizados por clínicas veterinárias e órgãos de controle sanitário animal, garantindo organização e rastreabilidade dos dados.
RNF-03 – Segurança e proteção de dados
O sistema deverá garantir a segurança das informações dos usuários, petshops e animais por meio de:
•	Criptografia de senhas (ex: hash seguro como bcrypt ou equivalente)
•	Uso de conexão segura (HTTPS)
•	Controle de acesso com autenticação de usuários
RNF-04 – Integridade e confiabilidade dos dados
O sistema deverá garantir que os dados cadastrados não sejam perdidos ou alterados indevidamente, mantendo consistência entre as informações de usuários, animais e histórico de atendimento.
RNF-05 – Desempenho do sistema
O sistema deverá responder às requisições principais (login, consulta e cadastro de dados) em tempo inferior a 3 segundos em condições normais de uso.




ESPECIFIÇAO DE INFRAESTRUTURA
ARQUITETURA DE REDES E CONECTIVIDADE 
Rede Local (LAN)
Provê a infraestrutura interna das unidades de petshops, possibilitando o armazenamento dos dados de clientes e animais.
Rede De Longa Distância (WAN)
Permite o acesso remoto para que o usuário (cliente) possa verificar as informações dos animais cadastrados, incluindo horários e exigências 
Protocolos de Segurança: Exige o uso obrigatório de protocolos criptográficos modernos, como o TLS 1.3, para resguardar todas as transações de dados na rede.















Caso de teste 
Caso de Teste 01 – Cadastro de Usuário
Objetivo: Verificar se o usuário consegue se cadastrar.
Passos:
1.	Acessar a tela de cadastro. 
2.	Informar nome, e-mail, senha, telefone e endereço. 
3.	Clicar em "Cadastrar". 
Resultado Esperado:
•	Usuário cadastrado com sucesso. 
•	Mensagem de confirmação exibida. 
•	Dados salvos no sistema. 
________________________________________
Caso de Teste 02 – Cadastro com E-mail Duplicado
Objetivo: Verificar se o sistema impede cadastro de e-mail já existente.
Passos:
1.	Cadastrar um usuário. 
2.	Tentar cadastrar outro usuário usando o mesmo e-mail. 
Resultado Esperado:
•	Cadastro não realizado. 
•	Mensagem informando que o e-mail já está cadastrado. 
________________________________________
Caso de Teste 03 – Senha Inválida
Objetivo: Verificar validação de senha.
Passos:
1.	Preencher o cadastro com senha menor que 6 caracteres. 
2.	Clicar em "Cadastrar". 
Resultado Esperado:
•	Cadastro não realizado. 
•	Mensagem informando que a senha deve possuir no mínimo 6 caracteres. 
________________________________________
Caso de Teste 04 – Login Válido
Objetivo: Verificar autenticação do usuário.
Passos:
1.	Informar e-mail e senha corretos. 
2.	Clicar em "Entrar". 
Resultado Esperado:
•	Usuário autenticado. 
•	Redirecionamento para Dashboard. 
________________________________________
Caso de Teste 05 – Login Inválido
Objetivo: Verificar autenticação com credenciais incorretas.
Passos:
1.	Informar e-mail ou senha incorretos. 
2.	Clicar em "Entrar". 
Resultado Esperado:
•	Login recusado. 
•	Mensagem de erro exibida. 
________________________________________
Caso de Teste 06 – Cadastro de Pet
Objetivo: Verificar cadastro de animal.
Passos:
1.	Acessar a tela de Pets. 
2.	Clicar em "Novo Pet". 
3.	Informar os dados solicitados. 
4.	Salvar. 
Resultado Esperado:
•	Pet cadastrado com sucesso. 
•	Pet exibido na lista. 
________________________________________
Caso de Teste 07 – Edição de Pet
Objetivo: Verificar atualização dos dados do pet.
Passos:
1.	Selecionar um pet existente. 
2.	Clicar em "Editar". 
3.	Alterar informações. 
4.	Salvar. 
Resultado Esperado:
•	Dados atualizados corretamente. 
________________________________________
Caso de Teste 08 – Exclusão de Pet
Objetivo: Verificar remoção de pet.
Passos:
1.	Selecionar um pet. 
2.	Clicar em "Excluir". 
3.	Confirmar exclusão. 
Resultado Esperado:
•	Pet removido da lista. 
•	Histórico de saúde e banhos associado removido. 
________________________________________
Caso de Teste 09 – Registro de Saúde
Objetivo: Verificar cadastro de informações de saúde.
Passos:
1.	Selecionar um pet. 
2.	Abrir a tela de saúde. 
3.	Informar vacinas, alergias, doenças e medicamentos. 
4.	Salvar. 
Resultado Esperado:
•	Informações registradas corretamente. 
________________________________________
Caso de Teste 10 – Agendamento de Banho
Objetivo: Verificar agendamento de banho.
Passos:
1.	Selecionar um pet. 
2.	Escolher data e horário disponíveis. 
3.	Informar observações. 
4.	Confirmar agendamento. 
Resultado Esperado:
•	Agendamento registrado. 
•	Mensagem de sucesso exibida. 
________________________________________
Caso de Teste 11 – Agendamento sem Seleção de Horário
Objetivo: Verificar validação do agendamento.
Passos:
1.	Selecionar um pet. 
2.	Não selecionar horário. 
3.	Clicar em "Confirmar". 
Resultado Esperado:
•	Agendamento não realizado. 
•	Mensagem solicitando seleção de horário. 
________________________________________
Caso de Teste 12 – Histórico de Banhos
Objetivo: Verificar exibição do histórico.
Passos:
1.	Realizar um agendamento. 
2.	Acessar a tela de histórico. 
Resultado Esperado:
•	Registro exibido com pet, data, horário e observações. 
________________________________________
Caso de Teste 13 – Exclusão de Registro de Banho
Objetivo: Verificar remoção do histórico.
Passos:
1.	Acessar o histórico. 
2.	Selecionar um registro. 
3.	Clicar em "Excluir". 
Resultado Esperado:
•	Registro removido do sistema. 
________________________________________
Caso de Teste 14 – Encerramento de Sessão
Objetivo: Verificar logout.
Passos:
1.	Estar autenticado. 
2.	Clicar em "Sair". 
Resultado Esperado:
•	Sessão encerrada. 
•	Redirecionamento para a tela de login. 
________________________________________
Caso de Teste 15 – Acesso sem Login
Objetivo: Verificar proteção das páginas.
Passos:
1.	Acessar diretamente Dashboard, Pets ou Histórico sem login. 
Resultado Esperado:
•	Usuário redirecionado para a tela de login.
