using db from '../db/schema';

@path:'/catalog'
service CatalogService {
    entity Materiais as projection on db.Materiais;
    
    function lerMateriais() returns array of Materiais;

    action criarMaterial(
        ID: String,
        nome: String,
        descricao: String,
        preco: Decimal(10,2)
    ) returns Materiais;
}