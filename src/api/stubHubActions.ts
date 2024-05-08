"use server";
import axios from "axios";

export const searchStubHub = async ({ keyword }: { keyword?: string }) => {
	try {
		const response = await axios.post(
			"https://www.stubhub.com/search/groupedsearch?FormatDate=true",
			{ text: keyword }
		);

        const url = await response?.data?.resultsWithMetadata[1].results.results[0].url;
        

        return response.data;
	} catch (error) {
		console.error(error);
	}
};
