import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  Method,
  ResponseType,
} from "axios";

interface RequestHandlerProps<T = unknown> {
  method: Method;
  url: string;
  data?: T;
  options?: AxiosRequestConfig;
  id: string;
  responseType?: ResponseType;
}

export default async function requestHandler<T = unknown>({
  method,
  url,
  data,
  options = {},
  id,
  responseType,
}: RequestHandlerProps<T>) {
  // Res Obj
  let response;
  // User Obj
  // const user = await currentUser()
  //   Header

  const headers: { [key: string]: string } = {
    "X-User-ID": id,
    "ngrok-skip-browser-warning": "69420",
  };

  //   if (user) {
  //     headers["Authorization"] = `Bearer ${user.publicMetadata.jwt}`;
  //   }
  //   Req Obj
  const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL; // Ensure this is set in your environment variables;

  // Add detailed check and logging
  if (!backendBaseUrl) {
    throw new Error(
      "Backend API URL is not configured or accessible in this context."
    );
  }

  // Construct the full URL
  const absoluteUrl = `${backendBaseUrl.replace(/\/$/, "")}${url}`; // Ensure single slash

  const requestObj = {
    method,
    url: absoluteUrl,
    mode: "cors",
    credentials: "same-origin",
    data,
    headers,
    responseType, // Include the responseType in the axios request
    ...options,
  };
  try {
    const res = await axios(requestObj);
    // For binary responses (like images), return the response data directly
    if (responseType === "blob" || responseType === "arraybuffer") {
      return res.data;
    }
    response = res.data;
  } catch (error) {
    console.error("Request failed:", error);
    throw error; // Re-throw if you want to handle it elsewhere
  }
  return response;
}
