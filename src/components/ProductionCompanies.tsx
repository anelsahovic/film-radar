type Props = {
  companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
};

export default function ProductionCompanies({ companies }: Props) {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Production Companies</h2>
      <div className="flex flex-wrap gap-4">
        {companies.map((company) => (
          <div
            key={company.id}
            className="flex items-center gap-3 p-3 rounded-xl bg-card transition-shadow duration-300"
          >
            <img
              src={
                company.logo_path
                  ? `https://image.tmdb.org/t/p/w200${company.logo_path}`
                  : '/images/no_image.png'
              }
              alt={company.name}
              className="h-10 sm:h-12 object-contain rounded"
            />

            <span className="font-medium text-foreground">{company.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
