import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { Card, Button } from 'react-native-paper';

export default function ApiPage() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageLimit, setPageLimit] = useState(1);

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
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
  }, [page]);

  useEffect(() => {
    console.log("data: ", data);
    console.log("pageLimit", pageLimit)
  }, [data]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  function CharacterCard({ character }) {
    return (
      <Card style={styles.card}>
        <Card.Title title={character.name} subtitle={`${character.species} - ${character.status}`} />
        <Card.Content>
          <Image source={{ uri: character.image }} style={styles.image} />
          <Text>Location: {character.location.name}</Text>
          <Text>Origin: {character.origin.name}</Text>
        </Card.Content>
        {/*<Card.Actions>
          <Button onPress={() => console.log("More details")}>More Details</Button>
        </Card.Actions>*/}
      </Card>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {data && data.map(character => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </ScrollView>

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
    backgroundColor: '#f0f0f0',
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
    padding: 10,
  },
});
