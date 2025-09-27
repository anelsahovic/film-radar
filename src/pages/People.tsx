import ErrorMessage from '@/components/ErrorMessage';
import Loader from '@/components/Loader';
import NoResults from '@/components/NoResults';
import PagePagination from '@/components/PagePagination';
import PersonCard from '@/components/PersonCard';
import Search from '@/components/Search';
import { getPeopleByQuery, getPopularPeople } from '@/services/people.service';
import type { Person } from '@/types/people.types';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

export default function People() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [totalPages, setTotalPages] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const pageNumber = searchParams.get('page') || '1';
  const searchQuery = searchParams.get('query') || '';

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setLoading(true);
        setErrorMessage('');

        const response =
          searchQuery.length > 0
            ? await getPeopleByQuery(searchQuery, Number(pageNumber))
            : await getPopularPeople(Number(pageNumber));

        if (response.status === 200) {
          setPeople(response.data.results);
          searchParams.set('page', response.data.page);
          setTotalPages(Math.min(response.data.total_pages, 500));
          setSearchParams(searchParams);
        } else {
          setErrorMessage('Something went wrong :(');
        }
      } catch (error) {
        console.log(error);
        setErrorMessage("We can't find any person right now");
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, [pageNumber, searchParams, searchQuery, setSearchParams]);

  const handleSearchQuery = (query: string) => {
    searchParams.set('query', query);
    searchParams.set('page', '1');

    if (query.length === 0) searchParams.delete('query');

    setSearchParams(searchParams);
  };

  const handlePageChange = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  return (
    <div className="flex flex-col gap-8 p-4 my-4">
      <title>Film Radar - Famous People</title>
      {/* search */}
      <div className="flex w-full justify-center px-4">
        <Search
          type="people"
          searchQuery={searchQuery}
          handleSearchQuery={handleSearchQuery}
        />
      </div>

      {/* title  */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* title */}
        <div className="flex flex-col items-center sm:items-start gap-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Discover People
          </h2>
          <h2 className="text-base sm:text-lg md:text-xl text-muted-foreground ">
            Explore famous people
          </h2>
        </div>
      </div>

      {/* loading state */}
      {loading && !errorMessage && <Loader />}

      {/* error message */}
      {!loading && errorMessage && <ErrorMessage message={errorMessage} />}

      {/* no result found */}
      {!loading && !errorMessage && people.length === 0 && (
        <NoResults type="people" />
      )}

      {/* rendering people cards */}
      {!loading && !errorMessage && people.length > 0 && (
        <div className="w-full justify-center gap-4 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] ">
          {people.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}
        </div>
      )}

      {/* pagination */}
      <div className="my-2">
        <PagePagination
          totalPages={totalPages}
          pageNumber={Number(pageNumber)}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
