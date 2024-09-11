const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {
  value: 'Tomar 3L de água por dia',
  checked: false
}

let metas = [meta]

const cadastrarMeta = async () => {
  const meta = await input({
    message: 'Cadastre sua meta: '
  })
  if(meta.length == 0){
    console.log('A meta não pode ser vazia')
    return
  }
  metas.push({
    value: meta,
    checked: false
  })
}

const listarMetas = async () => {
  const respostas = await checkbox({
    message: 'Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa',
    choices: [...metas],
    instructions: false
  })
  
  metas.forEach((m) => {
    m.checked = false
  })

  if(respostas.length == 0){
    console.log('Nenhuma meta selecionada')
    return
  }

  respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
      return m.value == resposta
    })
    meta.checked = true
  })
  console.log('Meta(s) marcadas como Concluída(s)')
}

const metasRealizadas = async () => {
  const realizadas = metas.filter((meta) => {
    return meta.checked
  })

  if(realizadas.length == 0){
    console.log('Não existem metas realizadas! :(')
    return
  }

  await select({
    message: 'Metas Realizadas ' + realizadas.length,
    choices: [...realizadas]
  })
}

const metasAbertas = async () => {
  const abertas = metas.filter((meta) => {
    return !meta.checked
  })
  if (abertas.length == 0) {
    console.log('Todas as suas metas estão concluídas ! :) ')
    return
  }
  await select({
    message: 'Metas Abertas '+ metas.length,
    choices: [...abertas]
  })
}

const deletarMetas = async () => {
  const metasDesmarcadas = metas.map((meta) => {
    return {value: meta.value, checked: false}
  })
  const itemsADeletar = await checkbox({
    message: 'Selecione o item para deletar',
    choices: [...metasDesmarcadas],
    instructions: false
  })
  if(itemsADeletar.length == 0) {
    console.log('Nenhum item para deletar')
    return
  }
  itemsADeletar.forEach((item) => {
    metas = metas.filter(() => {
      return meta.value != item
    })
  })
}

const start = async () => {
  while(true) {
    const options = await select({
      message: 'Menu >',
      choices: [
        {
          name: "Cadastrar meta",
          value: 'cadastrar'
        },
        {
          name: 'Listar Metas',
          value: 'listar'
        },
        {
          name: 'Metas realizadas',
          value: 'realizadas'
        },
        {
          name: 'Metas abertas',
          value: 'abertas'
        },
        {
          name: 'Deletar Metas',
          value: 'deletar'
        },
        {
          name: 'Sair',
          value: 'sair'
        }
      ]
    })
    switch(options){
      case 'cadastrar':
        await cadastrarMeta()
        break
      case 'listar':
        await listarMetas()
        break
      case 'realizadas':
        await metasRealizadas()
        break
      case 'abertas':
        await metasAbertas()
        break
      case 'deletar':
        await deletarMetas()
        break
      case 'sair':
        console.log('Até a próxima !!')
        return
    }
  }
}

start()