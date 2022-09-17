import React, { useEffect, useState } from "react";
import { View, Text, FlatList, SafeAreaView, StyleSheet } from "react-native";
import { DataTable } from 'react-native-paper';
import { useDispatch } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { additem } from "./redux/action";

const Screen1 = () => {

  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const [count, setCount] = useState(0)
  const [apidtata, setapidata] = useState<any[]>([]);
  const [loading, setloading] = useState(true);
  const [jsondata, setjasondata] = useState("");
  const [ignore, setignore] = useState(false);

  useEffect(() => {
    if (apidtata?.length === 0) {
      fetchdata();
      console.log("first time fetchdata called")
      setCount(prevCount => prevCount + 1)
    }
    else {
      const timer = setInterval(() => {
        setCount(prevCount => prevCount + 1)
        fetchdata();
        console.log("fetchdata called after 10 second" + " " + "and count is" + " " + count);
      }, 10000)
      return () => clearTimeout(timer);
    }
  }, [apidtata]);


  //var timer: any

  // const updateCount = () => {
  //   timer = setInterval(() => {
  //     console.log('ticking'),
  //       setCount(prevCount => prevCount + 1) // new
  //   }, 10000)
  // }

  // useEffect(() => {
  //   updateCount()
  //   return () => clearInterval(timer)
  // }, [])

  function showjson(e: any) {
    console.log(e);
    apidtata.filter((a, b) => {
      if (a.author === e) {
        var obj = a;
        var p = JSON.stringify(obj);
        setjasondata(p);
        dispatch(additem(p));
        console.log("jsondata called" + jsondata);
        //console.log(jsondata[0]+" "+"index 0")
        navigation.navigate('Details');
      }
    })
  }


  function fetchdata() {
    try {
      fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${count}`).then((resp) => {
        resp.json().then((dat) => {
          var p = dat.hits;
          setapidata([...apidtata, ...p]);
          console.log(apidtata);
          console.log(apidtata.length + 20 + " " + "length array" + " " + count + " " + " is count");
          setloading(false);
        })
      })
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView  >

      {loading === true ?
        <View style={styles.center}>
          <Text>Loading....</Text>
        </View > :
        <SafeAreaView  >

          <DataTable style={styles.container}>

            <DataTable.Header style={{ backgroundColor: "#b0e0e6" }} >
              <DataTable.Title style={styles.titlecenter}><Text style={styles.fontstitle}>title</Text></DataTable.Title>
              <DataTable.Title><Text style={styles.fontstitle}>URL</Text></DataTable.Title>
              <DataTable.Title><Text style={styles.fontstitle}>created_at</Text></DataTable.Title>
              <DataTable.Title><Text style={styles.fontstitle}>author</Text></DataTable.Title>
            </DataTable.Header>

            <FlatList
              data={apidtata}
              renderItem={({ item }) => {
                if (item.title === null) {
                  item.title = "NA"
                }
                else if (item.url === null) {
                  item.url = "NA"
                }
                else if (item.created_at === null) {
                  item.created_at = "NA"
                }
                else if (item.author === null) {
                  item.author = "NA"
                }
                return (

                  <DataTable.Row style={styles.main} onPress={() => showjson(item.author)} >

                    <DataTable.Cell style={styles.bright} ><View style={styles.dataceil}><Text >{item.title}</Text></View></DataTable.Cell>

                    <DataTable.Cell style={styles.bright} ><View style={styles.dataceil}><Text>{item.url}</Text></View></DataTable.Cell>
                    <DataTable.Cell style={styles.bright}><View style={styles.dataceil}><Text>{item.created_at}</Text></View></DataTable.Cell>
                    <DataTable.Cell ><View style={styles.dataceil}><Text>{item.author}</Text></View></DataTable.Cell>
                  </DataTable.Row>

                )
              }}
              keyExtractor={(item, index) => item.objectID + index}
              onEndReachedThreshold={0.5}
              onEndReached={() => { setCount(prevCount => prevCount + 1), console.log("page reach end"), fetchdata() }}
            />
          </DataTable>
        </SafeAreaView>}

    </SafeAreaView>
  )
}

export default Screen1;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',

  },
  bright: {
    borderRightColor: "black",
    borderRightWidth: 1
  },
  fonts: {
    fontSize: 40
  },
  fontstitle: {
    fontSize: 20,
    color: "solid black",

    //backgroundColor:"pink",

  },
  titlecenter: {
    // textAlign: "center",
    marginLeft: 10
  },
  main: {
    borderColor: "black",
    borderWidth: 1,
    borderLeftColor: "black",
    borderLeftWidth: 1,
    borderRightColor: "black",
    borderRightWidth: 1
  },

  center: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 300
  },
  dataceil: {
    height: 250,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    padding: 2
  },

});