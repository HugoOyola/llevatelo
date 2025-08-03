import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../styles/colors';

export default function WelcomeBanner() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Icon name="gift" size={36} color={colors.textWhite} style={styles.icon} />
        <View style={styles.textWrapper}>
          <Text style={styles.title}>¡Bienvenido a Llévatelo!</Text>
          <Text style={styles.subtitle}>
            Descubre los mejores productos geek y tecnológicos que tenemos para ti.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 3,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 16,
  },
  textWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textWhite,
    marginBottom: 4,
    fontFamily: 'Raleway-Bold',
  },
  subtitle: {
    fontSize: 14,
    color: colors.textWhite,
    lineHeight: 20,
    fontFamily: 'Raleway-Regular',
  },
});
