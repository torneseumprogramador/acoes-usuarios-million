const mongoose = require('../../db/conexao');

const AcoesUsuario = mongoose.model('acoes_usuarios',{
  codigo_usuario: {
    type: String,
    required:true
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

  percentual: {
    type:Number,
    required:true,
  },

  data_compra: { 
    type: Date,
    default: Date.now,
    immutable: true
  }          
});

AcoesUsuario.comprar = async(codigo_usuario, codigo_acao, valor_investido, percentual) => {
  try{
    let acao = await AcoesUsuario.create({
      codigo_usuario:codigo_usuario,
      codigo_acao: codigo_acao,
      valor_investido: valor_investido,
      percentual: percentual
      });
      return acao;
  }
  catch(err){
    return err;
  }
    
}

AcoesUsuario.calculaValorInvestido = async() => {
  console.log("Alterando percentual de ações");

  let atual = new Date(Date.now());
  var mercado_aberto = false;

  if (atual.getHours() >= 10 && atual.getHours() <= 18) {
    mercado_aberto = true;

    AcoesUsuario.find().then( async(acoes) => {
      await acoes.forEach( async(acao) => {
        let acrescimo_percentual = (Math.random() * acao.percentual) < 0.5 ? (Math.random()*-1) : Math.random();
        acao.percentual += acrescimo_percentual;
        await acao.save();
      })
    })
  }
  else if (atual.getHours() > 18 && mercado_aberto == true) {
    await AcoesUsuario.find().then( async(acoes) => {
      await acoes.forEach( async(acao) => {
      valor_somar = (acao.valor_investido * acao.percentual) / 100
      acao.valor_investido += valor_somar;
      acao.save();
      })
    })
    mercado_aberto = false;
  }
}

AcoesUsuario.valorInvestidoPorAcao = async(usuario_id, codigo_acao) => {
  var total = 0;
  await AcoesUsuario.find({codigo_usuario: usuario_id, codigo_acao: codigo_acao}).then( acoes => {
    acoes.forEach((acao) => {
      total += acao.valor_investido
    })
  })

  return {total: total, acao: codigo_acao};
}

module.exports = AcoesUsuario

