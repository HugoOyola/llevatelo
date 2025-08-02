import { Text, StyleSheet, View } from 'react-native';

const Badge = ({ label, color = '#E2E8F0', textColor = '#1A202C' }) => {
  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Text style={[styles.text, { color: textColor }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 10,
    fontWeight: '600',
  },
});

export default Badge;
