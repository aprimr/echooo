import React, { useEffect, useState } from "react";
import { FiCheck, FiSearch, FiX } from "react-icons/fi";
import { DocumentData, Timestamp } from "firebase/firestore";
import {
  searchFriends,
  sendFriendRequest,
  cancelFriendRequest,
  acceptFriendRequest,
} from "../../lib/networkManagement";
import {
  getLoginedUserDetails,
  getUserDetails,
} from "../../lib/firestoreHelpers";
import { getRelativeTime } from "../../utils/getRelativeTime";

enum Tabs {
  INVITES = "invites",
  MANAGE = "manage",
}

type UserSearchResult = {
  uid: string;
  name: string;
  photoURL: string;
  email: string;
  keywords: string[];
  createdAt: Timestamp;
  friends: string[];
  sentRequests: string[];
  receivedRequests: string[];
  requestedOn: Timestamp;
};

interface NetworkNavigationProps {
  tab: Tabs;
  setTab: (tab: Tabs) => void;
  loginedUser: DocumentData | null;
}

interface TabsProps {
  loginedUser: DocumentData | null;
}

interface LoadingListProps {
  title: string;
}

const Network: React.FC = () => {
  const [loginedUser, setLoginedUser] = useState<DocumentData | null>(null);
  const [tab, setTab] = useState<Tabs>(Tabs.INVITES);

  useEffect(() => {
    getLoginedUserDetails().then((user) => {
      setLoginedUser(user);
    });
  }, [loginedUser]);

  return (
    <div className="min-h-[100svh] w-full flex flex-col gap-4 px-5 py-4">
      <NetworkNavigation tab={tab} setTab={setTab} loginedUser={loginedUser} />
      {tab === Tabs.INVITES && <Invites loginedUser={loginedUser} />}
      {tab === Tabs.MANAGE && <Manage />}
    </div>
  );
};

export default Network;

const NetworkNavigation = ({
  tab,
  setTab,
  loginedUser,
}: NetworkNavigationProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const [searchResults, setSearchResults] = useState<DocumentData[]>([]);
  const [loadingAddFriend, setLoadingAddFriend] = useState<string[]>([]);

  // Debounce the search input
  useEffect(() => {
    if (search.trim() === "") {
      setDebouncedSearch("");
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Perform the search when debounced value updates
  useEffect(() => {
    if (debouncedSearch === "") return;

    const fetchResults = async () => {
      try {
        const results = await searchFriends(debouncedSearch);
        setSearchResults(results);
      } catch (err) {
        console.error("Search error:", err);
      }
    };

    fetchResults();
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
          onClick={() => {
            setIsSearchOpen(!isSearchOpen);
            setSearch("");
          }}
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
            {searchResults?.map((searchUser: DocumentData) => (
              <div
                key={searchUser.uid}
                className="w-full flex flex-row justify-between items-center gap-3 p-3 bg-neutral-100 hover:bg-neutral-200/70 rounded-lg transition-all shadow-sm overflow-hidden"
              >
                {/* User Info */}
                <div className="flex items-center gap-3 w-full sm:w-auto min-w-0">
                  <img
                    src={searchUser.photoURL}
                    alt={searchUser.uid}
                    className="h-10 w-10 rounded-full border-2 border-white object-cover flex-shrink-0"
                  />
                  <div className="flex  flex-col overflow-hidden min-w-0">
                    <p className="text-md font-medium text-neutral-700 font-inter truncate">
                      {searchUser.name}
                    </p>
                    <div className="text-xs flex gap-1 text-neutral-500 font-poppins truncate">
                      <span className="font-semibold">
                        {searchUser.friends.length}
                      </span>
                      <span>Friends</span>
                    </div>
                  </div>
                </div>

                {loginedUser &&
                  searchUser &&
                  loginedUser.uid !== searchUser.uid && (
                    <>
                      {loginedUser?.friends?.includes(searchUser.uid) ? null : (
                        <>
                          {loginedUser?.sentRequests?.some(
                            (req: DocumentData) => req.to === searchUser.uid
                          ) ? (
                            <button
                              onClick={() => {
                                setLoadingAddFriend(
                                  loadingAddFriend.filter(
                                    (uid) => uid !== searchUser.uid
                                  )
                                );
                                cancelFriendRequest(
                                  loginedUser.uid,
                                  searchUser.uid
                                );
                              }}
                              className="px-4 py-1.5 text-sm font-poppins bg-neutral-600 text-white rounded-md hover:bg-neutral-700 transition-all font-medium shadow whitespace-nowrap self-end sm:self-auto"
                            >
                              Cancel
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setLoadingAddFriend([
                                  ...loadingAddFriend,
                                  searchUser.uid,
                                ]);
                                sendFriendRequest(
                                  loginedUser.uid,
                                  searchUser.uid
                                );
                              }}
                              className="px-4 py-1.5 text-sm font-poppins bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all font-medium shadow whitespace-nowrap self-end sm:self-auto"
                            >
                              {loadingAddFriend.includes(searchUser.uid)
                                ? "Sending..."
                                : "Add Friend"}
                            </button>
                          )}
                        </>
                      )}
                    </>
                  )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Invites = ({ loginedUser }: TabsProps) => {
  const [receivedFriendRequests, setReceivedFriendRequests] = useState<
    UserSearchResult[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRequestUsers = async () => {
      if (
        !loginedUser?.receivedRequests ||
        loginedUser.receivedRequests.length === 0
      ) {
        setReceivedFriendRequests([]);
        setLoading(false);
        return;
      }

      try {
        const usersData = await Promise.all(
          loginedUser.receivedRequests.map(async (req: DocumentData) => {
            const tempUser = await getUserDetails(req.from);
            const user = {
              ...tempUser,
              requestedOn: req.at,
            };
            return user;
          })
        );

        setReceivedFriendRequests(usersData.filter(Boolean));
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestUsers();
  }, [loginedUser]);

  if (loading) {
    return <LoadingList title={"Received Requests"} />;
  }

  if (!loginedUser || receivedFriendRequests.length === 0) {
    return <NoInvites />;
  }

  return (
    <div className="h-full w-full flex flex-col justify-center">
      <h2 className="text-base text-neutral-500 font-poppins mb-3">
        Received Requests
      </h2>

      <div className="flex-grow flex flex-col gap-3">
        {receivedFriendRequests.map((user) => (
          <div
            key={user.uid}
            className="flex items-center justify-between px-3 py-2 bg-blue-100/40 rounded shadow"
          >
            <div className="flex items-center gap-3">
              <img
                src={user.photoURL}
                alt={user.name}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="h-full flex flex-col justify-between">
                <p className="text-base font-poppins">{user.name}</p>
                <p className="text-[10px] text-neutral-400 font-poppins">
                  {getRelativeTime(user.requestedOn)}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => acceptFriendRequest(user.uid, loginedUser.uid)}
                className="text-sm p-2 flex items-center justify-center bg-emerald-200/70 text-emerald-600/70 border-2 border-emerald-400 rounded-full shadow-md"
              >
                <FiCheck size={20} />
              </button>
              <button
                onClick={() => cancelFriendRequest(user.uid, loginedUser.uid)}
                className="text-sm p-2 flex items-center justify-center bg-rose-200/70 text-rose-600/70 border-2 border-rose-400 rounded-full shadow-md"
              >
                <FiX size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
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
      <h2 className="text-lg font-medium">No Friend Requests</h2>
      <p className="text-sm mt-1 text-neutral-400">
        You're all caught up — no pending friend requests right now.
      </p>
    </div>
  );
};

const NoFriends = () => {
  return (
    <div className="h-auto w-full pt-10 flex flex-col justify-center items-center text-center p-6 text-neutral-600 font-poppins">
      <h2 className="text-lg font-medium">No Friends Connected</h2>
      <p className="text-sm mt-1 text-neutral-400">
        Looks like your friend list is still empty. Go ahead and add someone!
      </p>
    </div>
  );
};

const LoadingList: React.FC<LoadingListProps> = ({ title }) => {
  return (
    <div className="h-full w-full flex flex-col justify-center">
      <h2 className="text-base text-neutral-500 font-poppins mb-3">{title}</h2>
      <div className="flex-grow flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-3 py-2 bg-neutral-100 rounded shadow animate-pulse"
            style={{ animationDelay: `${index * 0.3}s` }}
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-neutral-200 rounded-full" />
              <div>
                <div className="h-4 w-40 bg-neutral-200 rounded" />
              </div>
            </div>

            <div className="flex gap-2">
              <div className="h-10 w-10 bg-neutral-200 rounded-full" />
              <div className="h-10 w-10 bg-neutral-200 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
