-- seed_data.sql

-- Insertion des catégories
INSERT INTO categorie (nom) VALUES
  ('Alimentation'),
  ('Bâtiment'),
  ('Fabrication'),
  ('Services');

-- Insertion des spécialités
INSERT INTO specialite (nom, categorie_id) VALUES
  ('Boucher', (SELECT id FROM categorie WHERE nom='Alimentation')),
  ('Boulanger', (SELECT id FROM categorie WHERE nom='Alimentation')),
  ('Chocolatier', (SELECT id FROM categorie WHERE nom='Alimentation')),
  ('Traiteur', (SELECT id FROM categorie WHERE nom='Alimentation')),
  ('Chauffagiste', (SELECT id FROM categorie WHERE nom='Bâtiment')),
  ('Electricien', (SELECT id FROM categorie WHERE nom='Bâtiment')),
  ('Menuisier', (SELECT id FROM categorie WHERE nom='Bâtiment')),
  ('Plombier', (SELECT id FROM categorie WHERE nom='Bâtiment')),
  ('Bijoutier', (SELECT id FROM categorie WHERE nom='Fabrication')),
  ('Couturier', (SELECT id FROM categorie WHERE nom='Fabrication')),
  ('Ferronier', (SELECT id FROM categorie WHERE nom='Fabrication')),
  ('Coiffeur', (SELECT id FROM categorie WHERE nom='Services')),
  ('Fleuriste', (SELECT id FROM categorie WHERE nom='Services')),
  ('Toiletteur', (SELECT id FROM categorie WHERE nom='Services')),
  ('Webdesign', (SELECT id FROM categorie WHERE nom='Services'));

-- Insertion des artisans
INSERT INTO artisan (nom, note, photo_profil, ville, email, site_web, a_propos, top, specialite_id) VALUES
  ('Boucherie Dumont', 4.5, '', 'Lyon', 'boucherie.dumond@gmail.com', '', 'Lorem ipsum dolor sit amet...', FALSE, (SELECT id FROM specialite WHERE nom='Boucher')),
  ('Au pain chaud', 4.8, '', 'Montélimar', 'aupainchaud@hotmail.com', '', 'Lorem ipsum dolor sit amet...', TRUE, (SELECT id FROM specialite WHERE nom='Boulanger')),
  ('Chocolaterie Labbé', 4.9, '', 'Lyon', 'chocolaterie-labbe@gmail.com', 'https://chocolaterie-labbe.fr', 'Lorem ipsum dolor sit amet...', TRUE, (SELECT id FROM specialite WHERE nom='Chocolatier')),
  ('Traiteur Truchon', 4.1, '', 'Lyon', 'contact@truchon-traiteur.fr', 'https://truchon-traiteur.fr', 'Lorem ipsum dolor sit amet...', FALSE, (SELECT id FROM specialite WHERE nom='Traiteur')),
  ('Orville Salmons', 5.0, '', 'Evian', 'o-salmons@live.com', '', 'Lorem ipsum dolor sit amet...', TRUE, (SELECT id FROM specialite WHERE nom='Chauffagiste')),
  ('Mont Blanc Électricité', 4.5, '', 'Chamonix', 'contact@mont-blanc-electricite.com', 'https://mont-blanc-electricite.com', 'Lorem ipsum dolor sit amet...', FALSE, (SELECT id FROM specialite WHERE nom='Electricien')),
  ('Boutot & fils', 4.7, '', 'Bourg-en-Bresse', 'boutot-menuiserie@gmail.com', 'https://boutot-menuiserie.com', 'Lorem ipsum dolor sit amet...', FALSE, (SELECT id FROM specialite WHERE nom='Menuisier')),
  ('Vallis Bellemare', 4.0, '', 'Vienne', 'v.bellemare@gmail.com', 'https://plomberie-bellemare.com', 'Lorem ipsum dolor sit amet...', FALSE, (SELECT id FROM specialite WHERE nom='Plombier')),
  ('Claude Quinn', 4.2, '', 'Aix-les-Bains', 'claude.quinn@gmail.com', '', 'Lorem ipsum dolor sit amet...', FALSE, (SELECT id FROM specialite WHERE nom='Bijoutier')),
  ('Amitée Lécuyer', 4.5, '', 'Annecy', 'a.amitee@hotmail.com', 'https://lecuyer-couture.com', 'Lorem ipsum dolor sit amet...', FALSE, (SELECT id FROM specialite WHERE nom='Couturier')),
  ('Ernest Carignan', 5.0, '', 'Le Puy-en-Velay', 'e-carigan@hotmail.com', '', 'Lorem ipsum dolor sit amet...', FALSE, (SELECT id FROM specialite WHERE nom='Ferronier')),
  ('Royden Charbonneau', 3.8, '', 'Saint-Priest', 'r.charbonneau@gmail.com', '', 'Lorem ipsum dolor sit amet...', FALSE, (SELECT id FROM specialite WHERE nom='Coiffeur')),
  ('Leala Dennis', 3.8, '', 'Chambéry', 'l.dennos@hotmail.fr', 'https://coiffure-leala-chambery.fr', 'Lorem ipsum dolor sit amet...', FALSE, (SELECT id FROM specialite WHERE nom='Coiffeur')),
  ('C''est sup''hair', 4.1, '', 'Romans-sur-Isère', 'sup-hair@gmail.com', 'https://sup-hair.fr', 'Lorem ipsum dolor sit amet...', FALSE, (SELECT id FROM specialite WHERE nom='Coiffeur')),
  ('Le monde des fleurs', 4.6, '', 'Annonay', 'contact@le-monde-des-fleurs-annonay.fr', 'https://le-monde-des-fleurs-annonay.fr', 'Lorem ipsum dolor sit amet...', FALSE, (SELECT id FROM specialite WHERE nom='Fleuriste')),
  ('Valérie Laderoute', 4.5, '', 'Valence', 'v-laredoute@gmail.com', '', 'Lorem ipsum dolor sit amet...', FALSE, (SELECT id FROM specialite WHERE nom='Toiletteur')),
  ('CM Graphisme', 4.4, '', 'Valence', 'contact@cm-graphisme.com', 'https://cm-graphisme.com', 'Lorem ipsum dolor sit amet...', FALSE, (SELECT id FROM specialite WHERE nom='Webdesign'));
