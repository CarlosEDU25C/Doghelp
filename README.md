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
Caso de Teste 01 – Cadastro de Usuário Objetivo: Verificar se o usuário consegue se cadastrar. Passos:

Acessar a tela de cadastro.
Informar nome, e-mail, senha, telefone e endereço.
Clicar em "Cadastrar". Resultado Esperado: • Usuário cadastrado com sucesso. • Mensagem de confirmação exibida. • Dados salvos no sistema.
Caso de Teste 02 – Cadastro com E-mail Duplicado Objetivo: Verificar se o sistema impede cadastro de e-mail já existente. Passos:

Cadastrar um usuário.
Tentar cadastrar outro usuário usando o mesmo e-mail. Resultado Esperado: • Cadastro não realizado. • Mensagem informando que o e-mail já está cadastrado.
Caso de Teste 03 – Senha Inválida Objetivo: Verificar validação de senha. Passos:

Preencher o cadastro com senha menor que 6 caracteres.
Clicar em "Cadastrar". Resultado Esperado: • Cadastro não realizado. • Mensagem informando que a senha deve possuir no mínimo 6 caracteres.
Caso de Teste 04 – Login Válido Objetivo: Verificar autenticação do usuário. Passos:

Informar e-mail e senha corretos.
Clicar em "Entrar". Resultado Esperado: • Usuário autenticado. • Redirecionamento para Dashboard.
Caso de Teste 05 – Login Inválido Objetivo: Verificar autenticação com credenciais incorretas. Passos:

Informar e-mail ou senha incorretos.
Clicar em "Entrar". Resultado Esperado: • Login recusado. • Mensagem de erro exibida.
Caso de Teste 06 – Cadastro de Pet Objetivo: Verificar cadastro de animal. Passos:

Acessar a tela de Pets.
Clicar em "Novo Pet".
Informar os dados solicitados.
Salvar. Resultado Esperado: • Pet cadastrado com sucesso. • Pet exibido na lista.
Caso de Teste 07 – Edição de Pet Objetivo: Verificar atualização dos dados do pet. Passos:

Selecionar um pet existente.
Clicar em "Editar".
Alterar informações.
Caso de Teste 08 – Exclusão de Pet Objetivo: Verificar remoção de pet. Passos:

Selecionar um pet.
Clicar em "Excluir".
Confirmar exclusão. Resultado Esperado: • Pet removido da lista. • Histórico de saúde e banhos associado removido.
Salvar. Resultado Esperado: • Dados atualizados corretamente.












•	Usuário redirecionado para a tela de login.
