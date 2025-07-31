import { useEffect, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { searchFriends } from "../../lib/networkManagement";

enum Tabs {
  INVITES = "invites",
  MANAGE = "manage",
}

type User = {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
  friends: string[];
  createdAt: Date;
};

interface NetworkNavigationProps {
  tab: Tabs;
  setTab: (tab: Tabs) => void;
}

const Network: React.FC = () => {
  const [tab, setTab] = useState<Tabs>(Tabs.INVITES);
  return (
    <div className="min-h-[100svh] w-full flex flex-col gap-4 px-5 py-4">
      <NetworkNavigation tab={tab} setTab={setTab} />
      {tab === Tabs.INVITES && <Invites />}
      {tab === Tabs.MANAGE && <Manage />}
    </div>
  );
};

export default Network;

const NetworkNavigation = ({ tab, setTab }: NetworkNavigationProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const [searchResults, setSearchResults] = useState([]);

  // check input and update debounced search
  useEffect(() => {
    if (search.trim() === "") {
      setDebouncedSearch("");
      setSearchResults([]);
    }

    // update debounced search after 500ms
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Actual search on the base of debounced data
  useEffect(() => {
    if (debouncedSearch.trim() !== "") {
      searchFriends(debouncedSearch).then((results) => {
        setSearchResults(results);
      });
    }
  }, [debouncedSearch]);

  return (
    <div className="w-full flex justify-between items-center border-b-1 border-neutral-200/90 pb-3 gap-3 md:gap-0">
      {/* Tabs */}
      {/* Hide if search is open */}
      {!isSearchOpen ? (
        <div className="flex gap-4">
          {Object.values(Tabs).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1 rounded-md text-sm md:text-base font-semibold transition-all duration-200 ${
                tab === t
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-blue-200/30 text-blue-600 border border-blue-200 hover:bg-blue-50"
              }`}
            >
              {t === Tabs.INVITES ? "Invites" : "Manage"}
            </button>
          ))}
        </div>
      ) : (
        <div className="w-full relative">
          <input
            type="text"
            placeholder="Search a person..."
            maxLength={50}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 pr-10 py-1 rounded-lg bg-neutral-100/50 text-neutral-800 placeholder:text-neutral-500 border-2 border-neutral-300 focus:outline-none focus:bg-white focus:border-neutral-400 font-poppins transition-all duration-200"
          />
          {search && (
            <FiX
              size={18}
              onClick={() => {
                setSearch("");
                setSearchResults([]);
              }}
              className="absolute right-3 p-0.5 top-1/2 -translate-y-1/2 text-neutral-500 bg-neutral-200/50 rounded-full cursor-pointer hover:text-neutral-700 transition"
            />
          )}
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="p-2 rounded-full bg-blue-200/30 text-blue-600 border border-blue-100 hover:bg-blue-50 transition"
        >
          {!isSearchOpen ? (
            <FiSearch size={20} className="text-blue-600" />
          ) : (
            <FiX size={20} className="text-blue-600" />
          )}
        </button>
      </div>

      {/* Search results */}
      {isSearchOpen && (
        <div className="absolute top-[115px] left-0 w-full min-h-screen bg-white px-4 py-4 pb-20 z-10">
          <p className="text-sm text-neutral-500 font-poppins mb-3">
            {searchResults.length >= 1 ? "Search Results" : "No Results Found"}
          </p>

          <div className="flex flex-col gap-3">
            {/* Search Result Card */}
            {searchResults?.map((user: User) => (
              <div
                key={user.uid}
                className="w-full flex flex-row justify-between items-center gap-3 p-3 bg-neutral-100 hover:bg-neutral-200/70 rounded-lg transition-all shadow-sm overflow-hidden"
              >
                {/* User Info */}
                <div className="flex items-center gap-3 w-full sm:w-auto min-w-0">
                  <img
                    src={user.photoURL}
                    alt={user.uid}
                    className="h-10 w-10 rounded-full border-2 border-white object-cover flex-shrink-0"
                  />
                  <div className="flex  flex-col overflow-hidden min-w-0">
                    <p className="text-md font-medium text-neutral-700 font-inter truncate">
                      {user.name}
                    </p>
                    <div className="text-xs flex gap-1 text-neutral-500 font-poppins truncate">
                      <span className="font-semibold">
                        {user.friends.length}
                      </span>
                      <span>Friends</span>
                    </div>
                  </div>
                </div>

                {/* Invite Button */}
                <button className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all font-medium shadow whitespace-nowrap self-end sm:self-auto">
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Invites = () => {
  return (
    <div>
      <NoInvites />
    </div>
  );
};

const Manage = () => {
  return (
    <div>
      <NoFriends />
    </div>
  );
};

const NoInvites = () => {
  return (
    <div className="h-auto w-full pt-10 flex flex-col justify-center items-center text-center p-6 text-neutral-600 font-poppins">
      <h2 className="text-lg font-medium">No Invites</h2>
      <p className="text-sm mt-1 text-neutral-400">
        You haven’t received any friend requests yet.
      </p>
    </div>
  );
};

const NoFriends = () => {
  return (
    <div className="h-auto w-full pt-10 flex flex-col justify-center items-center text-center p-6 text-neutral-600 font-poppins">
      <h2 className="text-lg font-medium">No Connections</h2>
      <p className="text-sm mt-1 text-neutral-400">
        You haven’t added any friends yet. Start building your network!
      </p>
    </div>
  );
};
