import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { debounce } from "@mui/material/utils";
import { handleSuggestedEvents } from "@/api/ticketmasterActions";
import { useEffect, useMemo, useState } from "react";
import { CircularProgress, InputAdornment } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";

interface Event {
	name: string;
	id: string;
}

export default function EventSearch({
	incomingValue,
}: {
	incomingValue?: string;
}) {
	const router = useRouter();
	const [value, setValue] = useState<Event | null>(
		incomingValue ? { name: incomingValue, id: incomingValue } : null
	);
	const [inputValue, setInputValue] = useState("");
	const [loading, setLoading] = useState<boolean>(false);
	const [options, setOptions] = useState<readonly Event[]>([]);

	const fetch = useMemo(
		() =>
			debounce(
				(
					request: { input: string },
					callback: (results?: readonly Event[]) => void
				) => {
					// Replace the following line with a call to your getEvents function
					setLoading(true);
					handleSuggestedEvents({ keyword: request.input })
						.then((results: any) => {
							//readonly Event[]
							callback(results._embedded.attractions);
						})
						.catch((error: Error) => {
							console.error("Error fetching events:", error);
							callback([]);
						})
						.finally(() => {
							setLoading(false);
						});
				},
				400
			),
		[]
	);

	useEffect(() => {
		let active = true;

		if (inputValue === "") {
			setOptions(value ? [value] : []);
			return undefined;
		}

		fetch({ input: inputValue }, (results?: readonly Event[]) => {
			if (active) {
				let newOptions: readonly Event[] = [];

				if (value) {
					newOptions = [value];
				}

				if (results) {
					newOptions = [...newOptions, ...results];
				}

				setOptions(newOptions);
			}
		});

		return () => {
			active = false;
		};
	}, [value, inputValue, fetch]);

	return (
		<Autocomplete
			id="event-search"
			getOptionLabel={(option) => option.name}
			filterOptions={(x) => x}
			options={options}
			autoComplete
			includeInputInList
			loading={loading}
			filterSelectedOptions
			value={value}
			noOptionsText="No events found"
			onChange={(event: any, newValue: Event | null) => {
				setOptions(newValue ? [newValue, ...options] : options);
				setValue(newValue);
				router.push(`/search-event?keyword=${newValue?.name}`);
			}}
			onInputChange={(event, newInputValue) => {
				setInputValue(newInputValue);
			}}
			renderInput={(params) => (
				<TextField
					{...params}
					placeholder="Search for events"
					color="primary"
					InputProps={{
						...params.InputProps,
						sx: { p: 0, borderRadius: 52 },
						startAdornment: (
							<InputAdornment position="end">
								{loading ? (
									<CircularProgress size={20} />
								) : (
									<SearchOutlined />
								)}
							</InputAdornment>
						),
						endAdornment: null,
					}}
				/>
			)}
			//   renderOption={(props, option) => {
			//     // Define how to render each event in the autocomplete dropdown
			//     // You can use option properties to display event details
			//   }}
		/>
	);
}
