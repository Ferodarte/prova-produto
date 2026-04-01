const cds = require('@sap/cds')

module.exports = cds.service.impl(function () {

// 🔎 Ler materiais
this.on('lerMateriais', async () => {
return await cds.run(
SELECT.from('CatalogService.Materiais').orderBy('ID')
)
})

// ➕ Criar material
this.on('criarMaterial', async (req) => {

const { ID, nome, descricao, preco } = req.data

// 🚫 Validação: ID obrigatório
if (!ID || ID.trim() === '') {
return req.reject(400, 'O campo ID é obrigatório.')
}

const idTratado = ID.trim()

// 🔍 Verificar se já existe
const materialExistente = await cds.run(
SELECT.one.from('CatalogService.Materiais').where({ ID: idTratado })
)

if (materialExistente) {
return req.reject(400, `Já existe material com o ID ${idTratado}.`)
}

// 📦 Montar objeto
const novoMaterial = {
ID: idTratado,
nome,
descricao,
preco
}

// 💾 Inserir no banco
await cds.run(
INSERT.into('CatalogService.Materiais').entries(novoMaterial)
)

return novoMaterial
})

})
