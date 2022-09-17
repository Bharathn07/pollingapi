
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";

const Screen2 = () => {

    const jsonprint = useSelector((state: any) => state.addingitem);
    var arr = jsonprint.split("," );
    console.log(arr);
    console.log(arr[0]);

    return (

        <View style={styles.container} >
            <ScrollView>
                <Text style={{ fontSize: 20, fontWeight: "800", marginBottom: 20, color: "navy", textAlign: "center", marginTop: 10 }}> raw JSON. </Text>
                <View style={styles.newone}>
                    {arr.map((a: any, b: any) => {
                        return (
                            <Text key={b}>{a},</Text>
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    )
}

export default Screen2;

const styles = StyleSheet.create({
    newone: {
        backgroundColor: '#fff ',
        padding: 10
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "black",
        borderWidth: 1,

    },
})