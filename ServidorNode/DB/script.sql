create database pedidos 
default character set utf8
default collate utf8_general_ci;

/*-------------------------------------------------------------*/

create table tab_usuario(
	id_usuario int not null auto_increment,
	email varchar(100),
    senha varchar(100),
	nome varchar(100),
    
    primary key(id_usuario)
) default charset = utf8;


create table tab_produto(
	id_produto int not null auto_increment,
	descricao varchar(100),
    vl_produto decimal(12,2),
    
    primary key(id_produto)
) default charset = utf8;

create table tab_cliente(
	id_cliente int not null auto_increment,
	nome varchar(100),
	cidade varchar(50),
    uf varchar(2),
    
    primary key(id_cliente)
) default charset = utf8;

create table tab_cond_pagto(
	id_cond_pagto int not null auto_increment,
	cond_pagto varchar(50),
	
    primary key(id_cond_pagto)
) default charset = utf8;

create table tab_pedido_status(
	status char(1) not null,
	descricao varchar(50),
	
    primary key(status)
) default charset = utf8;

create table tab_pedido(
	id_pedido int not null auto_increment,
	id_cliente int,
	id_cond_pagto int,
	id_usuario int,
	status char(1),
	dt_pedido datetime,
	dt_entrega datetime,
	vl_total decimal(12,2),
	obs varchar(500),
	
    primary key(id_pedido),
	foreign key(id_cliente) references tab_cliente(id_cliente),
	foreign key(id_cond_pagto) references tab_cond_pagto(id_cond_pagto),
	foreign key(id_usuario) references tab_usuario(id_usuario),
	foreign key(status) references tab_pedido_status(status)
) default charset = utf8;


create table tab_pedido_item(
	id_item int not null auto_increment,
	id_pedido int,
	id_produto int,
	qtd decimal(12,3),	
	vl_unit decimal(12,2),
	vl_total decimal(12,2),	
	
    primary key(id_item),
	foreign key(id_pedido) references tab_pedido(id_pedido)
) default charset = utf8;


/*--------------------------------------------------------------------------------------------------*/

INSERT INTO TAB_USUARIO (EMAIL, SENHA, NOME)
VALUES('heber@99coders.com.br', '12345', 'Heber Stein Mazutti');

/*-------------------------------------------------*/

INSERT INTO TAB_PRODUTO(DESCRICAO, VL_PRODUTO)
VALUES('Monitor Dell', 440);

INSERT INTO TAB_PRODUTO(DESCRICAO, VL_PRODUTO)
VALUES('Monitor HP', 520);

INSERT INTO TAB_PRODUTO(DESCRICAO, VL_PRODUTO)
VALUES('Mouse Microsoft', 90);

INSERT INTO TAB_PRODUTO(DESCRICAO, VL_PRODUTO)
VALUES('Mouse Logitech', 79.90);

INSERT INTO TAB_PRODUTO(DESCRICAO, VL_PRODUTO)
VALUES('HD Seagate 2TB ', 330);

INSERT INTO TAB_PRODUTO(DESCRICAO, VL_PRODUTO)
VALUES('Webcam Logitech', 295);

INSERT INTO TAB_PRODUTO(DESCRICAO, VL_PRODUTO)
VALUES('Teclado Logitech', 140);

/*-------------------------------------------------*/

INSERT INTO TAB_CLIENTE(NOME, CIDADE, UF)
VALUES('99 Coders', 'São Paulo', 'SP');

INSERT INTO TAB_CLIENTE(NOME, CIDADE, UF)
VALUES('Autoposto Brasil', 'Campinas', 'SP');

INSERT INTO TAB_CLIENTE(NOME, CIDADE, UF)
VALUES('Mercado Central', 'Bauru', 'SP');

INSERT INTO TAB_CLIENTE(NOME, CIDADE, UF)
VALUES('Oficina Car', 'Curitiba', 'PR');

INSERT INTO TAB_CLIENTE(NOME, CIDADE, UF)
VALUES('ABC Serviços', 'Rio de Janeiro', 'RJ');

/*-------------------------------------------------*/

INSERT INTO TAB_COND_PAGTO(COND_PAGTO)
VALUES('A Vista');

INSERT INTO TAB_COND_PAGTO(COND_PAGTO)
VALUES('15 Dias');

INSERT INTO TAB_COND_PAGTO(COND_PAGTO)
VALUES('30 Dias');

INSERT INTO TAB_COND_PAGTO(COND_PAGTO)
VALUES('45 Dias');

INSERT INTO TAB_COND_PAGTO(COND_PAGTO)
VALUES('60 Dias');

/*-------------------------------------------------*/

INSERT INTO TAB_PEDIDO_STATUS(STATUS, DESCRICAO)
VALUES('A', 'Em aberto');

INSERT INTO TAB_PEDIDO_STATUS(STATUS, DESCRICAO)
VALUES('F', 'Finalizado');

/*-------------------------------------------------*/

INSERT INTO TAB_PEDIDO(ID_CLIENTE, ID_COND_PAGTO, ID_USUARIO, STATUS, DT_PEDIDO, DT_ENTREGA, VL_TOTAL, OBS)
VALUES(1, 1, 1, 'A', current_timestamp(), '2023-04-15', 1400, 'Entregar na parte da manhã');

INSERT INTO TAB_PEDIDO(ID_CLIENTE, ID_COND_PAGTO, ID_USUARIO, STATUS, DT_PEDIDO, DT_ENTREGA, VL_TOTAL, OBS)
VALUES(2, 2, 1, 'A', current_timestamp(), '2023-03-01', 180, NULL);

/*-------------------------------------------------*/

INSERT INTO TAB_PEDIDO_ITEM(ID_PEDIDO, ID_PRODUTO, QTD, VL_UNIT, VL_TOTAL)
VALUES(1, 1, 2, 440, 880);

INSERT INTO TAB_PEDIDO_ITEM(ID_PEDIDO, ID_PRODUTO, QTD, VL_UNIT, VL_TOTAL)
VALUES(1, 2, 1, 520, 520);

INSERT INTO TAB_PEDIDO_ITEM(ID_PEDIDO, ID_PRODUTO, QTD, VL_UNIT, VL_TOTAL)
VALUES(2, 3, 2, 90, 180);


/*----------------------------------------------------------*/

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345';

flush privileges;







