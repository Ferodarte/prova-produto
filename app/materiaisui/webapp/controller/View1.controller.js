sap.ui.define([
"sap/ui/core/mvc/Controller",
"sap/m/MessageToast",
"sap/m/StandardListItem"
], function (Controller, MessageToast, StandardListItem) {
"use strict";

return Controller.extend("br.com.provaproduto.materiaisui.controller.View1", {
onCriarMaterial: async function () {
const oView = this.getView();

const sID = oView.byId("inpID").getValue();
const sNome = oView.byId("inpNome").getValue();
const sDescricao = oView.byId("inpDescricao").getValue();
const sPreco = oView.byId("inpPreco").getValue();

try {
const response = await fetch("/catalog/criarMaterial", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
ID: sID,
nome: sNome,
descricao: sDescricao,
preco: parseFloat(sPreco)
})
});

const data = await response.json();

if (!response.ok) {
throw new Error(data.error?.message || "Erro ao criar material");
}

MessageToast.show("Material criado com sucesso");

oView.byId("inpID").setValue("");
oView.byId("inpNome").setValue("");
oView.byId("inpDescricao").setValue("");
oView.byId("inpPreco").setValue("");

this.onLerMateriais();
} catch (e) {
MessageToast.show(e.message);
}
},

onLerMateriais: async function () {
const oList = this.getView().byId("listaMateriais");
oList.removeAllItems();

try {
const response = await fetch("/catalog/Materiais");
const data = await response.json();

const aResultados = data.value || [];

aResultados.forEach(function (item) {
oList.addItem(new StandardListItem({
title: item.ID + " - " + item.nome,
description: item.descricao + " | Preço: " + item.preco
}));
});
} catch (e) {
MessageToast.show("Erro ao ler materiais");
}
}
});
});