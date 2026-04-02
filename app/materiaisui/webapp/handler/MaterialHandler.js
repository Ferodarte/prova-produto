sap.ui.define([
"sap/m/MessageBox",
"sap/ui/model/json/JSONModel"
], function (MessageBox, JSONModel) {
"use strict";

const MaterialHandler = function (oController) {
this._controller = oController;
};

MaterialHandler.prototype._bindTabela = function (aMateriais) {
const oTable = this._controller.byId("tabelaMateriais");
const oModel = new JSONModel(aMateriais);

oTable.setModel(oModel);

oTable.bindItems({
path: "/",
template: new sap.m.ColumnListItem({
cells: [
new sap.m.Text({ text: "{ID}" }),
new sap.m.Text({ text: "{nome}" }),
new sap.m.Text({ text: "{descricao}" }),
new sap.m.Text({ text: "{preco}" })
]
})
});
};

MaterialHandler.prototype.lerMateriais = async function () {
try {
const oView = this._controller.getView();
const sQtd = oView.byId("inputQtd").getValue();

const response = await fetch("/catalog/Materiais");
const data = await response.json();

let aMateriais = data.value || [];

if (sQtd && sQtd.trim() !== "") {
aMateriais = aMateriais.slice(0, parseInt(sQtd, 10));
}

this._bindTabela(aMateriais);

} catch (error) {
console.error(error);
MessageBox.error("Erro ao ler materiais.");
}
};

MaterialHandler.prototype.criarMaterial = async function (dados) {
try {
const responseLista = await fetch("/catalog/Materiais");
const dataLista = await responseLista.json();
const aMateriais = dataLista.value || [];

const jaExiste = aMateriais.some(function (item) {
return item.ID === dados.ID;
});

if (jaExiste) {
MessageBox.warning("Já existe material com este ID.");
return false;
}

const response = await fetch("/catalog/Materiais", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify(dados)
});

if (!response.ok) {
MessageBox.error("Erro ao criar material.");
return false;
}

MessageBox.success("Material criado com sucesso!");
await this.lerMateriais();
return true;

} catch (error) {
console.error(error);
MessageBox.error("Erro ao criar material.");
return false;
}
};

return MaterialHandler;
});