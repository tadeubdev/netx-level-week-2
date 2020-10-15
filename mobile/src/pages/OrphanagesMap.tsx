import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

import mapMarker from "../images/map-marker.png";
import { Feather } from "@expo/vector-icons";

function OrphanagesMap() {
  const navigation = useNavigation();

  function handleNavigationToOrphanageDetail() {
    navigation.navigate("OrphanageDetails");
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -19.8835575,
          longitude: -43.6622769,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        <Marker
          icon={mapMarker}
          coordinate={{
            latitude: -19.8835575,
            longitude: -43.6622769,
          }}
          calloutAnchor={{
            x: 3.2,
            y: 0.8
          }}
        >
          <Callout
            tooltip={true}
            onPress={handleNavigationToOrphanageDetail}
          >
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>Orfanato das meninas</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>2 orfanatos encontrados</Text>

        <TouchableOpacity style={styles.createOrphanageButton} onPress={() => {}}>
          <Feather name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  calloutContainer: {
    width: 220,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 16,
    justifyContent: "center",
  },

  calloutText: {
    color: "#0089a5",
    fontFamily: "Nunito_700Bold",
  },

  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 42,

    backgroundColor: "#fff",
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    elevation: 3,
  },

  footerText: {
    color: "#8fa7b3",
    fontFamily: "Nunito_700Bold",
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: "#15c3d6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

});

export default OrphanagesMap;
