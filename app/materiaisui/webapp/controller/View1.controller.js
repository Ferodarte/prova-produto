sap.ui.define([
"sap/ui/core/mvc/Controller",
"sap/m/Dialog",
"sap/m/Input",
"sap/m/Button",
"sap/m/VBox",
"sap/m/Label",
"sap/m/MessageBox",
"br/com/provaproduto/materiaisui/handler/MaterialHandler"
], function (Controller, Dialog, Input, Button, VBox, Label, MessageBox, MaterialHandler) {
"use strict";

return Controller.extend("br.com.provaproduto.materiaisui.controller.View1", {

onInit: function () {
this._handler = new MaterialHandler(this);
this._oDialogCriar = null;
},

onLerMateriais: function () {
this._handler.lerMateriais();
},

onAbrirDialogCriar: function () {
if (!this._oDialogCriar) {
this._oDialogCriar = new Dialog({
title: "Criar Material",
contentWidth: "400px",
content: new VBox({
class: "sapUiSmallMargin",
items: [
new Label({ text: "ID" }),
new Input("dlgId"),

new Label({ text: "Nome" }),
new Input("dlgNome"),

new Label({ text: "Descrição" }),
new Input("dlgDescricao"),

new Label({ text: "Preço" }),
new Input("dlgPreco")
]
}),
beginButton: new Button({
text: "Salvar",
press: async function () {
const dados = {
ID: sap.ui.getCore().byId("dlgId").getValue(),
nome: sap.ui.getCore().byId("dlgNome").getValue(),
descricao: sap.ui.getCore().byId("dlgDescricao").getValue(),
preco: parseFloat(sap.ui.getCore().byId("dlgPreco").getValue())
};

if (!dados.ID || !dados.nome || !dados.descricao || isNaN(dados.preco)) {
MessageBox.warning("Preencha ID, Nome, Descrição e Preço.");
return;
}

const criado = await this._handler.criarMaterial(dados);

if (criado) {
this._oDialogCriar.close();

sap.ui.getCore().byId("dlgId").setValue("");
sap.ui.getCore().byId("dlgNome").setValue("");
sap.ui.getCore().byId("dlgDescricao").setValue("");
sap.ui.getCore().byId("dlgPreco").setValue("");
}
}.bind(this)
}),
endButton: new Button({
text: "Cancelar",
press: function () {
this._oDialogCriar.close();
}.bind(this)
})
});

this.getView().addDependent(this._oDialogCriar);
}

sap.ui.getCore().byId("dlgId").setValue("");
sap.ui.getCore().byId("dlgNome").setValue("");
sap.ui.getCore().byId("dlgDescricao").setValue("");
sap.ui.getCore().byId("dlgPreco").setValue("");

this._oDialogCriar.open();
}

});
});