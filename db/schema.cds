namespace db;

entity Materiais {
    key ID    : String(20);
    nome      : String(100);
    descricao : String(255);
    preco : Decimal(10,2);
}