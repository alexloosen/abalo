<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DevelopmentData extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // ab_user befuellen
        // Datei öffnen, $handle ist der Dateizeiger
        $handle = fopen('database\seeds\user.csv', 'r',);
        // erste Zeile nicht beachten
        fgetcsv($handle,100,';');
        // Datei zeilenweise auslesen, fgetcsv() anwenden, im Array $csv_array speichern
        while (($csv_array = fgetcsv($handle,100,';')) !== FALSE) {
            // Daten des Arrays $csv_array in die korrekte Tabelle fügen
            DB::table('ab_user')->insert([
                'id' => (int)$csv_array[0],
                'ab_name' => $csv_array[1],
                'ab_password' => $csv_array[2],
                'ab_mail' => $csv_array[3]
            ]);
        }
        // Datei schließen
        fclose($handle);


        // ab_article befuellen
        // Datei öffnen, $handle ist der Dateizeiger
        $handle = fopen('database\seeds\articles.csv', 'r',);
        // erste Zeile nicht beachten
        fgetcsv($handle,500,';');
        while (($csv_array = fgetcsv($handle,500,';')) !== FALSE) {
            // Daten des Arrays $csv_array in die korrekte Tabelle fügen
            $date = date_create_from_format('d.m.y H:i', $csv_array[5]);
            DB::table('ab_article')->insert([
                'id' => (int)$csv_array[0],
                'ab_name' => $csv_array[1],
                'ab_price' => (int)$csv_array[2]*100,
                'ab_description' => $csv_array[3],
                'ab_creator_id' => (int)$csv_array[4],
                'ab_createdate' => $date
            ]);
            // Hier den Sequenz-Parameter der Tabelle noch auf einen gewünschten Wert setzen!
            DB::select('Select setval(pg_get_serial_sequence(\'ab_article\', \'id\'),31);');
        }
// Datei schließen
        fclose($handle);
        // Datei zeilenweise auslesen, fgetcsv() anwenden, im Array $csv_array speichern

// articlecategory befuellen
        // Datei öffnen, $handle ist der Dateizeiger
        $handle = fopen('database\seeds\articlecategory.csv', 'r',);
        // erste Zeile nicht beachten
        fgetcsv($handle,100,';');
        // Datei zeilenweise auslesen, fgetcsv() anwenden, im Array $csv_array speichern
        while (($csv_array = fgetcsv($handle,100,';')) !== FALSE) {
            // Daten des Arrays $csv_array in die korrekte Tabelle fügen
            if($csv_array[2] == 'NULL')
                $value = null;
            else
                $value = $csv_array[2];
            DB::table('ab_articlecategory')->insert([
                'id' => (int)$csv_array[0],
                'ab_name' => $csv_array[1],
                'ab_parent' => $value
            ]);
        }
// Datei schließen
        fclose($handle);


// article_has_articlecategory befuellen
        // Datei öffnen, $handle ist der Dateizeiger
        $handle = fopen('database\seeds\article_has_articlecategory.csv', 'r',);
        // erste Zeile nicht beachten
        fgetcsv($handle,100,';');
        // Datei zeilenweise auslesen, fgetcsv() anwenden, im Array $csv_array speichern
        while (($csv_array = fgetcsv($handle,100,';')) !== FALSE) {
            $id = DB::select('Select nextval(pg_get_serial_sequence(\'ab_article_has_articlecategory\', \'id\')) as new_id;');
            DB::table('ab_article_has_articlecategory')->insert([
                'id' => $id[0]->new_id,
                'ab_articlecategory_id' => $csv_array[0],
                'ab_article_id' => $csv_array[1]
            ]);
        }
// Datei schließen
        fclose($handle);
    }
}
