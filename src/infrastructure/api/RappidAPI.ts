const headers = {
		'x-rapidapi-key': import.meta.env.VITE_RAPPID_API_KEY as string,
		'x-rapidapi-host': import.meta.env.VITE_RAPPID_HOST as string
	}

export async function getMeaningWord(word: string): Promise<string> {
  const response = await fetch(`/rappid/definition/?entry=${encodeURIComponent(word)}`, {
    headers
  });

  if (!response.ok) throw new Error("Could not get meaning word");

  const result = await response.json();
  let definition = ''
  if (result.meaning.adjective) {
    definition += result.meaning.adjective + ' <br />'
  }
  if (result.meaning.adverb) {
    definition += result.meaning.adverb + ' <br />'
  }
  if (result.meaning.noun) {
    definition += result.meaning.noun + ' <br />'
  }
  if (result.meaning.verb) {
    definition += result.meaning.verb + ' <br />'
  }
  return definition
}