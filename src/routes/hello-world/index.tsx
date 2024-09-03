import { useState, useEffect, useCallback } from "react"

type UserId = "A" | "B";
type Winner = UserId | "T" | null;

interface User {
  id: UserId
  // timeSpent: number;
  startTime: number;
}

const rows = 6;
const cols = 7;
const winCombinationLength = 4;

export default function Connect4Game() {
  const [mappedUsers, setMappedUsers] = useState({
    A: {
      timeSpent: 0,
    },
    B: {
      timeSpent: 0,
    }
  });

  const updateUserTotalTimeSpent = () => {
    const timeSpentForCurrentMove = new Date().getTime() - currentUser.startTime;

    setMappedUsers(prevState => ({
        ...prevState,
        [currentUser.id]: {
          ...prevState[currentUser.id],
          timeSpent: prevState[currentUser.id].timeSpent + timeSpentForCurrentMove
        }
    }));
  };

  const [currentUser, setCurrentUser] = useState<User>({
    id: "A",
    startTime: new Date().getTime(),
  });
  const [winner, setWinner] = useState<Winner>(null)

  const [userAMoves, setUserAMoves] = useState<Set<number>>(new Set());
  const [userBMoves, setUserBMoves] = useState<Set<number>>(new Set());

  const incrementCurrentTime = useCallback(() => {
    console.log(currentUser.id)
    if (currentUser.id === null) return;

    // console.log(currentUser.id)
    setMappedUsers((prevState) => ({
      ...prevState,
      [currentUser.id]: {
        ...prevState[currentUser.id],
        timeSpent: prevState[currentUser.id].timeSpent + 1000,
      },
    }))
  }, [currentUser.id]);

  useEffect(() => {
    const interval = setInterval(incrementCurrentTime, 1000, currentUser)

    // return clearInterval(interval);
  }, [])

  const addUserMark = (index: number): void => {
    if (winner || userAMoves.has(index) || userBMoves.has(index)) return;

    let dropIndex = findDropIndex(index);

    if (dropIndex !== -1) {
      // updateUserTotalTimeSpent();

      if (currentUser.id === "A") {
        updateMovesAndCheckWinner(dropIndex, userAMoves, setUserAMoves);
      } else {
        updateMovesAndCheckWinner(dropIndex, userBMoves, setUserBMoves);
      }
    }
  };

  const findDropIndex = (index: number): number => {
    while (index > 0) {
      const belowIndex = index - cols;
      if (
        belowIndex <= 0 ||
        userAMoves.has(belowIndex) ||
        userBMoves.has(belowIndex)
      ) {
        return index;
      }
      index = belowIndex;
    }
    return -1;
  };

  const updateMovesAndCheckWinner = (
    index: number,
    moves: Set<number>,
    setMoves: React.Dispatch<React.SetStateAction<Set<number>>>
  ): void => {
    const newMoves = new Set(moves).add(index);
    setMoves(newMoves);

    if (checkWinner(index, newMoves)) {
      setWinner(currentUser.id);
      return;
    }

    if (userAMoves.size + userBMoves.size === rows * cols - 1) {
      setWinner("T");
      return;
    }

    setCurrentUser((prevUser) => ({
      ...prevUser,
      id: prevUser.id === "A" ? "B" : "A",
    }))
  };

  const getColor = (index: number): string => {
    if (userAMoves.has(index)) return "bg-green-600 shadow-green-800";
    if (userBMoves.has(index)) return "bg-orange-600 shadow-orange-800";
    return "bg-slate-300 shadow-slate-800";
  };

  const getRowNumber = (index: number): number => {
    return Math.floor((index - 1) / cols) + 1;
  };

  const getColumnNumber = (index: number): number => {
    return index % cols == 0 ? cols : index % cols;
  }

  const checkWinner = (index: number, movesSet: Set<number>): boolean => {
    return (
      checkLine(index, movesSet, 1, 0, 1) || // Horizontal
      checkLine(index, movesSet, cols, 1, 0) || // Vertical
      checkLine(index, movesSet, cols + 1, 1, 1) || // Diagonal from bottom-right to top-left
      checkLine(index, movesSet, cols - 1, 1, 1) // Diagonal from bottom-left to top-right
    );
  };

  const checkLine = (
    index: number,
    movesSet: Set<number>,
    step: number,
    rowDelta: number,
    colDelta: number,
  ): boolean => {
    let count = 1;

    count += countDirection(index, movesSet, step, rowDelta, colDelta);
    count += countDirection(index, movesSet, -step, rowDelta, colDelta);

    return count >= winCombinationLength;
  };

  const countDirection = (
    startIndex: number,
    movesSet: Set<number>,
    step: number,
    rowDelta: number,
    colDelta: number,
  ): number => {
    let count = 0;
    let index = startIndex + step;

    while (
      index >= 0 &&
      index <= rows * cols &&
      movesSet.has(index) &&
      Math.abs(getColumnNumber(index) - getColumnNumber(startIndex)) === colDelta && 
      Math.abs(getRowNumber(index) - getRowNumber(startIndex)) === rowDelta
    ) {
      count++;
      startIndex = index;
      index += step;
    }

    return count;
  };

  const surrender = () => {
    setWinner(currentUser.id == "A" ? "B" : "A")
  }

  const mlToSeconds = (ml) => {
    return Math.round(ml / 1000);
  }

  return (
    <div className="flex flex-col justify-center items-center p-4">
      <div className="flex">
        <div id="user-info-A" className="flex flex-col border rounded bg-slate-500 text-white">
          <h3>Player A</h3>
          <p>Total time spent: {mlToSeconds(mappedUsers.A.timeSpent)} seconds</p>
          {currentUser.id == "A" ? <p>Your turn!</p> : <p>Opponent Turn</p>}
        </div>
        <div className="flex justify-center items-center flex-col w-full p-24">
          <div className="w-fit grid grid-cols-7 gap-0 bg-slate-800">
            {[...Array(rows * cols)].map((_, i) => {
              const index = rows * cols - i
              return (
                <div
                  key={index}
                  id={index.toString()}
                  className={`border border-black w-16 h-16 m-2 flex items-center justify-center rounded-full shadow-inner ${getColor(
                    index,
                  )}`}
                  onClick={() => addUserMark(index)}
                >
                  {index}
                </div>
              )
            })}
          </div>
          {winner ? (
            <p>
              {winner === "T" ? "It's a tie!" : `Winner is User ${winner}`}
              <button className="bg-stone-600 p-1" onClick={() => window.location.reload()}>
                Restart
              </button>
            </p>
          ) : (
            <p className="p-4 border m-4">User {currentUser.id}'s turn</p>
          )}
        </div>
        <div id="user-info-B" className="userInfo"></div>
      </div>
      <button
        className="flex p-2 rounded bg-slate-600 text-slate-200 border-slate-700 border 
          hover:bg-slate-700 hover:border-slate-800
            active:bg-slate-800 active:border-slate-900
        "
        disabled={winner !== null}
        onClick={surrender}
      >
        Surrender
      </button>
    </div>
  )
}
