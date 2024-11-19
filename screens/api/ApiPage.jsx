import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, Picker } from 'react-native';
import { Modal, Portal, IconButton, Card, Button, TextInput, useTheme } from 'react-native-paper';

export default function ApiPage() {
  const { colors } = useTheme();
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageLimit, setPageLimit] = useState(1);
  const [nQuery, setNQuery] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);


  const [filters, setFilters] = useState({
    name: '',
    status: '',
    species: '',
    type: '',
    gender: ''
  });

  const handleSubmit = () => {
    setNQuery((prev) => {
      return prev+1;
    })
  };

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [key]: value }));
    setPage(1); // Reset to the first page when filters change
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Mapear de forma automática los params en JSON!
        const query = new URLSearchParams({ ...filters, page }).toString();

        const response = await fetch(`https://rickandmortyapi.com/api/character/?${query}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const json = await response.json();
        setPageLimit(json.info.pages);
        setData(json.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, nQuery]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  function CharacterCard({ character }) {
    return (
      <Card style={[styles.card, { backgroundColor: colors.surface }]}>
        <Card.Title title={character.name} subtitle={`${character.species} - ${character.status}`} />
        <Card.Content>
          <Image source={{ uri: character.image }} style={styles.image} />
          <Text style={{ color: colors.text }}>Location: {character.location.name}</Text>
          <Text style={{ color: colors.text }}>Origin: {character.origin.name}</Text>
        </Card.Content>
      </Card>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
    
      <View>
        {/* Botón para abrir el modal */}
        <Button mode="contained" onPress={() => setModalVisible(true)}>
          Filters
        </Button>

        {/* Modal */}
        <Portal>
          <Modal
            visible={isModalVisible}
            onDismiss={() => setModalVisible(false)}
            contentContainerStyle={[
              styles.modalContainer,
              { backgroundColor: colors.surface, borderColor: colors.primary },
            ]}
          >
            <View>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Filters</Text>

              {/* Fila de TextInputs */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                <TextInput
                  label="Name"
                  value={filters.name}
                  onChangeText={value => handleFilterChange('name', value)}
                  style={{ flex: 1, marginRight: 5 }}
                  mode="outlined"
                  theme={{ colors: { text: colors.text, primary: colors.primary } }}
                />
                <TextInput
                  label="Type"
                  value={filters.type}
                  onChangeText={value => handleFilterChange('type', value)}
                  style={{ flex: 1, marginLeft: 5 }}
                  mode="outlined"
                  theme={{ colors: { text: colors.text, primary: colors.primary } }}
                />
              </View>

              {/* Selectores con etiquetas */}
              <View style={{ marginBottom: 15 }}>
                <Text style={styles.filterLabel}>Status</Text>
                <Picker
                  selectedValue={filters.status}
                  onValueChange={value => handleFilterChange('status', value)}
                  style={styles.filterPicker}
                >
                  <Picker.Item label="All" value="" />
                  <Picker.Item label="Alive" value="alive" />
                  <Picker.Item label="Dead" value="dead" />
                  <Picker.Item label="Unknown" value="unknown" />
                </Picker>
              </View>

              <View style={{ marginBottom: 15 }}>
                <Text style={styles.filterLabel}>Species</Text>
                <Picker
                  selectedValue={filters.species}
                  onValueChange={value => handleFilterChange('species', value)}
                  style={styles.filterPicker}
                >
                  <Picker.Item label="All" value="" />
                  <Picker.Item label="Human" value="human" />
                  <Picker.Item label="Alien" value="alien" />
                  <Picker.Item label="Humanoid" value="humanoid" />
                  <Picker.Item label="Animal" value="animal" />
                </Picker>
              </View>

              <View>
                <Text style={styles.filterLabel}>Gender</Text>
                <Picker
                  selectedValue={filters.gender}
                  onValueChange={value => handleFilterChange('gender', value)}
                  style={styles.filterPicker}
                >
                  <Picker.Item label="All" value="" />
                  <Picker.Item label="Male" value="male" />
                  <Picker.Item label="Female" value="female" />
                  <Picker.Item label="Genderless" value="genderless" />
                  <Picker.Item label="Unknown" value="unknown" />
                </Picker>
              </View>

              {/* Botón para aplicar filtros */}
              <Button
                mode="contained"
                onPress={() => {
                  handleSubmit();
                  setModalVisible(false);
                }}
                style={{ marginTop: 15 }}
                theme={{ colors: { primary: colors.primary } }}
              >
                Apply Filters
              </Button>
            </View>
          </Modal>
        </Portal>
      </View>
      

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Character Cards */}
        {data && data.map(character => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </ScrollView>

      {/* Pagination */}
      <View style={styles.paginationContainer}>
        <Button mode="contained" onPress={handlePrevPage} disabled={page === 1}>
          Previous
        </Button>
        <Text style={styles.pageNumber}>Page {page}</Text>
        <Button mode="contained" onPress={handleNextPage} disabled={page === pageLimit}>
          Next
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 10,
    alignItems: 'center',
    height: "100%", 
    overflow: "auto"
  },
  card: {
    width: '90%',
    marginBottom: 10,
    borderRadius: 8,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginVertical: 10,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: 'gray', 
    borderTopWidth: 0.5,
    padding: 10,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  filterPicker: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 5,
  },
});
