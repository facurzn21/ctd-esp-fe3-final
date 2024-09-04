import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    // Solicita datos del cómic usando la API de Marvel
    const response = await fetch(
      `https://gateway.marvel.com/v1/public/comics/${id}?ts=1000&apikey=9c13f09d734436992a5f806b1b485adf&hash=01f538a62c398bbe3eeeaf75172af46d`
    );

    // Verifica si la respuesta es correcta
    if (!response.ok) {
      throw new Error("Error fetching data from Marvel API");
    }

    // Convierte la respuesta en JSON
    const data = await response.json();

    // Verifica si el cómic existe en la respuesta
    if (!data.data.results[0]) {
      return res.status(404).json({ error: "Comic not found" });
    }

    // Envía los datos del cómic como respuesta
    res.status(200).json(data.data.results[0]);
  } catch (error) {
    console.error("Error fetching data from Marvel API:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
