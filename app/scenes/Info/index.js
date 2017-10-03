// @flow
import React, { Component } from "react";
import {
  Image,
  LayoutAnimation,
  PixelRatio,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Components } from "exponent";
const { MapView } = Components;

import ListTitle from "../../components/ListTitle";
import Navbar from "../../components/Navbar";
import Scene from "../../components/Scene";

import theme from "../../theme";
import { attemptToOpenUrl } from "../../utils";

// UTN - FRD, Campana, Buenos Aires, Argentina.
const mapRegion = {
  latitude: -34.179225,
  longitude: -58.9624597,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01
};

const repoUrl = "https://github.com/UTN-FRD/frd-app";

export default class Info extends Component {
  props: {
    navigator: Object
  };

  state = {
    modalIsOpen: false
  };

  _marker: any;

  componentDidMount() {
    // Sometimes it takes more than a second for the map to load, so in those cases it's best to
    // just keep trying with an exponential* back off. (* exponential: e to the power of 0) ;-)
    const tryToShowCallout = () => {
      if (this._marker) {
        this._marker.showCallout();
      } else {
        setTimeout(tryToShowCallout, 1000);
      }
    };

    tryToShowCallout();
  }

  toggleModal = () => {
    LayoutAnimation.easeInEaseOut();
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
  };

  openMap() {
    const position = `${mapRegion.latitude},${mapRegion.longitude}`;
    const query = encodeURI("Facultad Regional Delta");
    const url = `https://maps.google.com/?ll=${position}&q=${query}`;

    attemptToOpenUrl(url);
  }

  openRepository() {
    attemptToOpenUrl(repoUrl);
  }

  render() {
    const { navigator } = this.props;
    const { modalIsOpen } = this.state;

    return (
      <Scene>
        <Navbar
          title="Información"
          leftButtonIconName="ios-arrow-back"
          leftButtonOnPress={navigator.popToTop}
          rightButtonText="Dirección"
          rightButtonOnPress={this.openMap}
        />
        <ScrollView>
          <MapView initialRegion={mapRegion} style={styles.map}>
            <MapView.Marker
              coordinate={mapRegion}
              description="UTN - Facultad Regional Delta"
              onCalloutPress={this.openMap}
              ref={r => {
                this._marker = r;
              }}
              title="UTN-FRD"
            />
          </MapView>

          <View style={{ flex: 1 }}>
            <View style={styles.hero}>
              <Text style={styles.heroText}>
                Un espacio de formación e intercambio para estudiantes, docentes, profesionales e investigadores vinculados a los Sistemas de Información.
              </Text>
              <Text style={styles.heroText}></Text>
            </View>

            <View style={styles.madeby}>
              <Text style={styles.madebyText}>
                Esta aplicación fue realizada por la Software Factory - UTN FRD.
              </Text>
              <TouchableOpacity
                onPress={this.openRepository}
                activeOpacity={0.75}
              >
                <Text style={styles.heroLink}>
                  Ver código fuente
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {!!modalIsOpen}
      </Scene>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    height: 200,
    maxHeight: 200
  },
  // hero
  hero: {
    alignItems: "center",
    backgroundColor: "white",
    borderBottomColor: theme.color.gray20,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderTopColor: theme.color.gray30,
    borderTopWidth: 1 / PixelRatio.get(),
    paddingHorizontal: theme.fontSize.default
  },
  heroText: {
    paddingTop: theme.fontSize.xlarge,
    fontSize: theme.fontSize.default,
    fontWeight: "300",
    lineHeight: theme.fontSize.large,
    textAlign: "center",
  },
  heroLink: {
    color: theme.color.blue,
    fontSize: theme.fontSize.default,
    fontWeight: "500",
    padding: theme.fontSize.large
  },

  madeby: {
    alignItems: "center",
    paddingHorizontal: theme.fontSize.default,
    paddingVertical: theme.fontSize.xlarge
  },
  madebyLink: {
    alignItems: "center"
  },
  madebyText: {
    fontSize: theme.fontSize.default,
    fontWeight: "300",
    lineHeight: theme.fontSize.large,
    marginTop: theme.fontSize.default,
    textAlign: "center"
  },
  madebyTitle: {
    fontWeight: "500"
  }
});
