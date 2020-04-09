const mongoose = require('../../db/conexao');

const AcaoUsuario = mongoose.model('acoes_usuarios',{
  codigo_usuario: {
    type: Number,
    required:true,
    validate:{
      validator:Number.isInteger
    } 
  },

  codigo_acao: {
    type: String,
    required:true,
    uppercase: true
  },

  valor_investido: {
    type:Number,
    required:true,
  },

  data_compra: { 
    type: Date,
    default: Date.now,
    immutable: true
  }          
});

AcaoUsuario.valorInvestidoPorAcao = async(usuario_id, codigo_acao) => {
  let total = 0;
  let percentual = 3;
  let atual = new Date(Date.now());
  atual = new Date(atual.setDate(atual.getDate() + 1));

  let sub_dias = 0;

  if (atual.getHours() >= 18) {
    sub_dias = 1;
  }

  await AcaoUsuario.find({codigo_usuario: usuario_id, codigo_acao: codigo_acao}).then( acoes => {
    acoes.forEach((acao) => {
      let valor_investimento = acao.valor_investido;
      let data_compra = new Date(acao.data_compra);

      console.log(data_compra.getTime());
      console.log(atual.getTime());

      let resultado = atual.getTime() - data_compra.getTime();
      let dias_investidos = Math.floor(resultado / (1000*60*60*24));
      
      console.log(dias_investidos);

      if (dias_investidos > 0) {
        let valor_percentual = (acao.valor_investido * percentual) / 100;
        valor_investimento += valor_percentual
      }

      total += valor_investimento
    })
  })
  return {total: total, acao: codigo_acao};
}

module.exports = AcaoUsuario

