-- ============================================================
-- GESTÃO IASD — banco de dados no Supabase
-- Cole tudo no "SQL Editor" do seu projeto e clique em "Run".
-- Pode rodar de novo sem problemas.
-- ============================================================

create table if not exists public.iasd_registros (
  colecao        text        not null,              -- ex.: financeiro, membros, escalaSom...
  id             text        not null,              -- id do registro
  ordem          integer     not null default 0,    -- ordem (roteiros e checklist)
  dados          jsonb       not null,              -- conteúdo do registro
  atualizado_em  timestamptz not null default now(),
  atualizado_por uuid                 default auth.uid(),
  primary key (colecao, id)
);

create index if not exists iasd_registros_colecao_idx on public.iasd_registros (colecao);

-- Atualiza data/usuário a cada alteração
create or replace function public.iasd_touch() returns trigger
language plpgsql as $$
begin
  new.atualizado_em := now();
  new.atualizado_por := auth.uid();
  return new;
end $$;

drop trigger if exists iasd_registros_touch on public.iasd_registros;
create trigger iasd_registros_touch before update on public.iasd_registros
  for each row execute function public.iasd_touch();

-- Segurança: somente usuários logados (criados por você no painel) acessam os dados
alter table public.iasd_registros enable row level security;

drop policy if exists "iasd ler"    on public.iasd_registros;
drop policy if exists "iasd inserir" on public.iasd_registros;
drop policy if exists "iasd alterar" on public.iasd_registros;
drop policy if exists "iasd excluir" on public.iasd_registros;

create policy "iasd ler"     on public.iasd_registros for select to authenticated using (true);
create policy "iasd inserir" on public.iasd_registros for insert to authenticated with check (true);
create policy "iasd alterar" on public.iasd_registros for update to authenticated using (true) with check (true);
create policy "iasd excluir" on public.iasd_registros for delete to authenticated using (true);

-- Tempo real: alterações aparecem nos outros computadores na hora
alter table public.iasd_registros replica identity full;
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'iasd_registros'
  ) then
    alter publication supabase_realtime add table public.iasd_registros;
  end if;
end $$;
