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

INSERT INTO `artisan` (`id`, `nom`, `note`, `photo_profil`, `ville`, `email`, `site_web`, `a_propos`, `top`, `specialite_id`) VALUES
(1, 'Boucherie Dumont', 4.5, 'https://cdn.pixabay.com/photo/2023/10/23/15/24/ai-generated-8336369_1280.jpg', 'Lyon', 'boucherie.dumond@gmail.com', '', 'Lorem ipsum dolor sit amet...', 0, 1),
(2, 'Au pain chaud', 4.8, 'https://cdn.pixabay.com/photo/2017/10/24/19/55/bread-2885965_1280.jpg', 'Montélimar', 'aupainchaud@hotmail.com', '', 'Lorem ipsum dolor sit amet...', 1, 2),
(3, 'Chocolaterie Labbé', 4.9, 'https://cdn.pixabay.com/photo/2019/02/17/19/17/praline-4002952_1280.jpg', 'Lyon', 'chocolaterie-labbe@gmail.com', 'https://chocolaterie-labbe.fr', 'Lorem ipsum dolor sit amet...', 1, 3),
(4, 'Traiteur Truchon', 4.1, '', 'Lyon', 'contact@truchon-traiteur.fr', 'https://truchon-traiteur.fr', 'Lorem ipsum dolor sit amet...', 0, 4),
(5, 'Orville Salmons', 5.0, '', 'Evian', 'o-salmons@live.com', '', 'Lorem ipsum dolor sit amet...', 1, 5),
(6, 'Mont Blanc Électricité', 4.5, '', 'Chamonix', 'contact@mont-blanc-electricite.com', 'https://mont-blanc-electricite.com', 'Lorem ipsum dolor sit amet...', 0, 6),
(7, 'Boutot & fils', 4.7, 'https://cdn.pixabay.com/photo/2022/11/12/11/11/carpentry-7586789_1280.jpg', 'Bourg-en-Bresse', 'boutot-menuiserie@gmail.com', 'https://boutot-menuiserie.com', 'Lorem ipsum dolor sit amet...', 0, 7),
(8, 'Vallis Bellemare', 4.0, '', 'Vienne', 'v.bellemare@gmail.com', 'https://plomberie-bellemare.com', 'Lorem ipsum dolor sit amet...', 0, 8),
(9, 'Claude Quinn', 4.2, 'https://cdn.pixabay.com/photo/2023/10/19/12/29/ai-generated-8326512_1280.jpg', 'Aix-les-Bains', 'claude.quinn@gmail.com', '', 'Lorem ipsum dolor sit amet...', 0, 9),
(10, 'Amitée Lécuyer', 4.5, 'https://cdn.pixabay.com/photo/2017/08/24/01/21/red-2675141_1280.jpg', 'Annecy', 'a.amitee@hotmail.com', 'https://lecuyer-couture.com', 'Lorem ipsum dolor sit amet...', 0, 10),
(11, 'Ernest Carignan', 5.0, '', 'Le Puy-en-Velay', 'e-carigan@hotmail.com', '', 'Lorem ipsum dolor sit amet...', 0, 11),
(12, 'Royden Charbonneau', 3.8, 'https://cdn.pixabay.com/photo/2023/09/15/04/25/fashion-8254063_1280.jpg', 'Saint-Priest', 'r.charbonneau@gmail.com', '', 'Lorem ipsum dolor sit amet...', 0, 12),
(13, 'Leala Dennis', 3.8, 'https://cdn.pixabay.com/photo/2023/09/15/04/25/fashion-8254063_1280.jpg', 'Chambéry', 'l.dennos@hotmail.fr', 'https://coiffure-leala-chambery.fr', 'Lorem ipsum dolor sit amet...', 0, 12),
(14, 'C\'est sup\'hair', 4.1, 'https://cdn.pixabay.com/photo/2023/09/15/04/25/fashion-8254063_1280.jpg', 'Romans-sur-Isère', 'sup-hair@gmail.com', 'https://sup-hair.fr', 'Lorem ipsum dolor sit amet...', 0, 12),
(15, 'Le monde des fleurs', 4.6, '', 'Annonay', 'contact@le-monde-des-fleurs-annonay.fr', 'https://le-monde-des-fleurs-annonay.fr', 'Lorem ipsum dolor sit amet...', 0, 13),
(16, 'Valérie Laderoute', 4.5, '', 'Valence', 'v-laredoute@gmail.com', '', 'Lorem ipsum dolor sit amet...', 0, 14),
(17, 'CM Graphisme', 4.4, '', 'Valence', 'contact@cm-graphisme.com', 'https://cm-graphisme.com', 'Lorem ipsum dolor sit amet...', 0, 15);

