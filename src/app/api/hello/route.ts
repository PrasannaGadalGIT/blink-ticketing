import {
    ACTIONS_CORS_HEADERS, // Importing CORS headers for actions
    ActionGetResponse, // Type for GET response
    ActionPostRequest, // Type for POST request
    ActionPostResponse, // Type for POST response
    createPostResponse, // Function to create a POST response
  } from "@solana/actions";
  
  import {
    Connection, // Class for Solana network connection
    LAMPORTS_PER_SOL, // Constant for lamports to SOL conversion
    PublicKey, // Class for handling public keys
    SystemProgram, // System program for basic transactions
    Transaction, // Class for creating transactions
    clusterApiUrl, // Function to get cluster API URL
  } from "@solana/web3.js";
  
  export async function GET(request: Request) {
    const url = new URL(request.url); // Parse the request URL
    const payload: ActionGetResponse = {
      // Define the GET response payload
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7dPPWr-BRKzBy_Fig0v_snt-_onQj9Pl5xA&s", // Icon URL
      title: "Donate to the Rahul", // Title
      description: "Support rahul by donating SOL.", // Description
      label: "Donate", // Label for the action
      links: {
        actions: [
          {
            label: "Donate 0.1 SOL", // Action label
            href: `${url.href}?amount=0.1`, // Action URL with amount parameter,
            type : 'transaction'
          },
        ],
      },
    };
    return Response.json(payload, {
      headers: ACTIONS_CORS_HEADERS, // Set CORS headers
    });
  }