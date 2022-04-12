import { StatusBar } from 'expo-status-bar';
import React,{ useState, useEffect } from 'react';
// useState é para poder usar estados durante a aplicação
import { StyleSheet, Text, View, TouchableOpacity, TextInput, AsyncStorage} from 'react-native';
//touchableopacity é uma importação para fazer os botoões bonitinhos
//textinput é para o usuário conseguir digitar
//AsyncStorage é para fazer a persistência de dados

export default function App() {

  //o primerio é o de leitura, onde o usuário somente lê o que está anotado e é o estado que o app se inicia
  //segundo estado é o de anotação, onde ele atualiza a anotação
    const [estado,setarEstado] = useState('leitura');
    const [anotacao,setarAnotacao] = useState('');   

    useEffect(()=>{
        //Quando inicializar o app queremos que leia a key anotacao.
        //tendi muita coisa, mas a gente confia e entrega na mão de Deus
        (async () => {
            try{
                const anotacaoLeitura = await AsyncStorage.getItem('anotacao');
                setarAnotacao(anotacaoLeitura);
            }catch(error){}
        })();
    },[])

    setData = async() => {
      //função para salvar dados
        try{
                                       //chave  ||  valor  
            await AsyncStorage.setItem('anotacao',anotacao);
                                    //salva o que estiver na variavel anotação
        }catch(error){

        }

        alert('Sua anotação foi salva!');
    }
 
    function atualizarTexto(){
        //Função para salvar a atualização
        setarEstado('leitura');
        setData();
    }
    
    if(estado == 'leitura'){
      //não entendi muito bem o porque desse style flex, mas ok
      return(
        //statusbar hidden esconde  a statusbar, mas pode usar a statusbar style light, para deixar o header encostado nela
        <View style={{flex:1}}>
          <StatusBar hidden />
            <View style={styles.header}>
              <Text style={{textAlign:'center',color:'white',fontSize:18}}>Aplicativo Anotação</Text>
            </View>
            {
              (anotacao != '')?
              <View style={{padding:20}}>
                <Text style={styles.anotacao}>{anotacao}</Text>
              </View>
              :
              <View style={{padding:20}}>
                <Text style={{opacity:0.3}}>Nenhuma anotação encontrada :(</Text>
              </View>
            }
            
            <TouchableOpacity onPress={()=> setarEstado('atualizando')} style={styles.btnAnotacao}>
            {
              (anotacao == "")?
              <Text style={styles.btnAnotacaoTexto}>+</Text>
              :
              <Text style={{fontSize:12,color:'white',textAlign:'center',marginTop:16}}>Editar</Text>
              }
            </TouchableOpacity>
        </View>
        //no botão, na parte de onPress, é para dar ação ao mesmo
        //o botão muda de leitura para atualizando
      )
    //aqui o estado "leitura" já passou para o estado "atualizando", ou seja, a anotação vai sofrer alterações
    }else if(estado == 'atualizando'){
      return(
      <View style={{flex:1}}>
        <StatusBar hidden />
        
        <View style={styles.header}>
          <Text style={{textAlign:'center',color:'white',fontSize:18}}>Aplicativo Anotação</Text>
        </View>
        
        <TextInput autoFocus={true} onChangeText={(text)=>setarAnotacao(text)} style={{padding:20,height:300,textAlignVertical:'top'}}  multiline={true} numberOfLines={5} value={anotacao}></TextInput>        

        <TouchableOpacity onPress={()=> atualizarTexto()} style={styles.btnSalvar}>
          <Text style={{textAlign:'center',color:'white'}}>Salvar</Text>
        </TouchableOpacity>
      </View>
      //comando da linha de entrada de dados
      //   autoFocus => já leva o cursor para a área de escrita
      //    onChangeText é o que possibilita alterar o texto
      //<TextInput autoFocus={true} onChangeText={(text)=>setarAnotacao(text)} 
      //style={{padding:20,height:300,textAlignVertical:'top'}} 
      //        numberOflines é a quantidade de linhas
      //multiline={true} numberOfLines={5} value={anotacao}></TextInput>        

      );
    }
}

//estilos para se aplicar durante a criação do códgio
const styles = StyleSheet.create({
      //é onde aparece o título do app
      header:{
        width: '100%',
        padding: 20,
        backgroundColor: 'blue'
      },
      //CRIAR UM TIPO ESPECÍFICO PARA O TITULO DO APP!!!


      //é a formatação do texto salvo
      anotacao:{
        fontSize:13
      },
      //estilização do botão
      btnAnotacao:{
        //posição absoluta não deixa o botão se mexer
        position:'absolute',
        right:20,
        bottom:20,
        //eu não consegui pensar em melhor maneira para descrever isso aqui a não ser falar que é um tapete
        width:50,
        height:50,
        backgroundColor:'#069',
        //deixa redondo o tapete
        //tem que deixar ele a metade do width e heigth
        borderRadius:25
      },
      //estilizando o texto que está dentro do botão
      btnAnotacaoTexto:{
        color:'white',
        position:'relative',
        textAlign:'center',
        top: 3,
        fontSize:30
      },
      btnSalvar:{
        position:'absolute',
        right:20,
        bottom:20,
        width:100,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#069',
      },
});