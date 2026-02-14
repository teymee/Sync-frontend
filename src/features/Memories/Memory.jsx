import { supabase } from "@/utils/config";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Memory() {
  const { id } = useParams();

  //   🚨 usestate
  const [userMemory, setUserMemory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMemory = async () => {
      setIsLoading(true);
      const { data } = await supabase.from("memories").select().eq("id", id);

      setUserMemory(data[0]);
      setIsLoading(false);
    };
    getMemory();
  }, [id]);

  const { name, email, future, images, title, playlist, memory, date } =
    userMemory || {};

  let canView = false;

  if (date) {
    const dateInMS = Date.parse(date);
    const rightNow = Date.parse(new Date());
    canView = rightNow >= dateInMS;
  }

  console.log(canView,userMemory)

  return (
    <section className="text-center">
      <div>Memory</div>
      <p>{id}</p>

      {isLoading && <p>Loading... </p>}

      {!isLoading && userMemory && (
        <section>
          {!canView && <p> Hey Slow down it's not yet our agreed time</p>}
          {canView && (
            <section className="space-y-4">
              <div> title: {title} </div>
              <div> Name: {name}</div>
              <div> Email: {email}</div>
              <div> Memory: {memory} </div>
              <div> Future: {future} </div>
              <div> Playlist: {playlist} </div>

              <div>
                <p>Images:</p>

                <div className="flex gap-x-4 items-center justify-center">
                  {JSON.parse(images)?.map((img) => {
                    return (
                      <img
                        src={img}
                        className="w-[200px] h-[200px] object-contain"
                      />
                    );
                  })}
                </div>
              </div>
            </section>
          )}
        </section>
      )}
    </section>
  );
}
